import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getZipData} from "../../dataloader/ZipLoader";
import Navigation from "../navigation/Navigation";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import {useQuery} from "react-query";
import yaml from "yaml"
import {Information as ParsedInformations} from "../../models/information/Information";

function generateSnapshotBanner(snapshot: Boolean) {
    if (snapshot) {
        return (
            <div className={"bg-amber-200 text-zinc-950 p-2"}>
                <h1 className={"text-center align-middle"}>You are using a SNAPSHOT Version</h1>
            </div>
        );
    }
    return null;
}

function Information() {
    const params = useParams();
    const binId = params.binId;
    const query = useQuery({
        queryKey: [binId],
        queryFn: ({queryKey}) => getZipData({params}),
        staleTime: 10 * (60 * 1000), // 10 mins
        cacheTime: 15 * (60 * 1000), // 15 mins
    });
    const data = query.data
    useEffect(() => {
        hljs.highlightAll();
    });
    if (query.isError) return null;
    let parsedYaml = yaml.parse(data?.information ?? "") as ParsedInformations;
    let snapshot = (parsedYaml?.volans?.version as String ?? "").includes('SNAPSHOT')
    const classes = () => {
        if (snapshot) {
            return "flex flex-auto flex-col h-screen border-l-2 border-amber-200"
        } else {
            return "flex flex-auto flex-col h-screen";
        }
    }
    return (
        <div className="w-100 bg-slate-900 text-white h-screen">
            <Navigation code={data?.information ?? ""}/>
            {generateSnapshotBanner(snapshot)}
            <div className={"flex flex-auto flex-col h-screen"}>
                <pre className={classes()}>
                    <code className={"h-screen language-yaml "}>{data?.information}</code>
                </pre>
            </div>
        </div>
    );
}

export default Information;