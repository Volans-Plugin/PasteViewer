import React from 'react';
import {Link, useParams} from "react-router-dom";

function Navigation() {
    const params = useParams();
    const binId = params.binId;
    return (
        <header className="flex flex-row flex-auto border-b-2 border-teal-600 bg-teal-500	">
            <ul className={"flex flex-row flex-auto list-none"}>
                <li className={"p-4"}>
                    <Link to={`/${binId}/latestlog`}>Latest Log</Link>
                </li>
                <li className={"p-4"}>
                    <Link to={`/${binId}/information`}>Information</Link>
                </li>
                <li className={"p-4"}>
                    <Link to={`/${binId}/config`}>Config</Link>
                </li>
            </ul>
        </header>
    );
}
export default Navigation;