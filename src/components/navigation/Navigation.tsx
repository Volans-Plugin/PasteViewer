import React from 'react';
import {useParams} from "react-router-dom";

function Navigation() {
    const params = useParams();
    const binId = params.binId;
    return (
        <header className="flex flex-row flex-auto border-b-2 border-teal-600 bg-teal-500	">
            <ul className={"flex flex-row flex-auto list-none"}>
                <li className={"p-4"}>
                    <a href={`/${binId}/latestlog`}>Latest Log</a>
                </li>
                <li className={"p-4"}>
                    <a href={`/${binId}/information`}>Information</a>
                </li>
                <li className={"p-4"}>
                    <a href={`/${binId}/config`}>Config</a>
                </li>
            </ul>
        </header>
    );
}
export default Navigation;