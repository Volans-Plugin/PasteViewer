import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getZipData} from "../../dataloader/ZipLoader";
import Navigation from "../navigation/Navigation";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import {useQuery} from "react-query";
import yaml from "yaml"

function generateSnapshotBanner(snapshot: Boolean) {
    if (snapshot) {
        return (
            <div className={"h-10 bg-rose-700"}>
                <h1>You are using a SNAPSHOT VERSION</h1>
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
    let parsedYaml = yaml.parse(data?.information ?? "");
    let snapshot = (parsedYaml?.volans?.Version as String ?? "").includes('SNAPSHOT')

    return (
        <div className="w-100 bg-slate-900 text-white h-screen">
            <Navigation/>
            {generateSnapshotBanner(snapshot)}
            <div className={"flex flex-auto flex-col h-screen"}>
                <pre className={"p-0 grow h-screen"}>
                    <code className={"h-screen language-yaml"}>{data?.information}</code>
                </pre>
            </div>
        </div>
    );
}

export default Information;