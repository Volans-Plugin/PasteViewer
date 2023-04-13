import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getZipData} from "../../dataloader/ZipLoader";
import Navigation from "../navigation/Navigation";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import {useQuery} from "react-query";


function Config() {
    const params = useParams();
    const binId = params.binId;
    const query = useQuery({
        queryKey: [binId],
        queryFn: ({queryKey}) => getZipData({params}),
        staleTime: 10 * (60 * 1000), // 10 mins
        cacheTime: 15 * (60 * 1000), // 15 mins
    } );
    const data = query.data
    useEffect(() => {
        hljs.highlightAll();
    });

    return (
        <div className="w-100 bg-slate-900 text-white min-h-screen">
            <Navigation code={data?.config ?? ""}/>
            <div className={"flex flex-auto flex-col min-h-screen"}>
                <pre className={"grow min-h-screen"}>
                    <code className={"min-h-screen language-yaml"}>{data?.config}</code>
                </pre>
            </div>
        </div>
    );
}

export default Config;