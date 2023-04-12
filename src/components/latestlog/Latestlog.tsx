import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getZipData} from "../../dataloader/ZipLoader";
import hljs from "highlight.js";
import Navigation from "../navigation/Navigation";
import "highlight.js/styles/github-dark.css";
import {useQuery} from "react-query";


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
    return (
        <div className="w-100 bg-slate-900 text-white h-screen">
            <Navigation />
            <div className={"flex flex-auto flex-col h-screen"}>
                <pre className={"p-0 grow h-screen"}>
                    <code className={"h-screen language-pgsql"}>{data?.latestLog}</code>
                </pre>
            </div>
        </div>
    );
}

export default Latestlog;