import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getZipData} from "../../dataloader/ZipLoader";
import hljs from "highlight.js";
import Navigation from "../navigation/Navigation";
import "highlight.js/styles/github-dark.css";
import {useQuery} from "react-query";
import yaml from "yaml";
import {Information as ParsedInformations} from "../../models/information/Information";


function Latestlog() {
    const params = useParams();
    const binId = params.binId;
    const query = useQuery({
        queryKey: [binId],
        queryFn: ({queryKey}) => getZipData({params}),
        staleTime: 10 * (60 * 1000), // 10 mins
        cacheTime: 15 * (60 * 1000), // 15 mins
    } );
    useEffect(() => {
        hljs.highlightAll();
    });

    const data = query.data
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
            <Navigation code={data?.latestLog ?? ""}/>
            <div className={classes()}>
                <pre className={"p-0 grow h-screen"}>
                    <code className={"h-screen language-accesslog"}>{data?.latestLog}</code>
                </pre>
            </div>
        </div>
    );
}

export default Latestlog;