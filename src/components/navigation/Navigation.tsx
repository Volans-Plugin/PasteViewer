import React from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useCopyToClipboard} from "usehooks-ts";
import {FaCopy} from "@react-icons/all-files/fa/FaCopy";

function Navigation({code}: { code: string }) {
    const params = useParams();
    const binId = params.binId;
    const [value, copy] = useCopyToClipboard()

    const classNamesActive = (props: {
        isActive: boolean;
        isPending: boolean;
    }) => {
        if (props.isActive) {
            return "p-4 border-b-2 border-white-600";
        }
        return "p-4 hover:border-b-2 border-white-600 duration-100";
    };

    const copyToClipboard = () => {
      copy(code);
    };

    return (
        <header className="flex flex-row flex-auto bg-stone-800	text-zinc-100	">
            <div className={"flex flex-row flex-auto list-none"}>
                <NavLink to={`/${binId}/latestlog`} className={classNamesActive} >
                    Latest Log
                </NavLink>
                <NavLink to={`/${binId}/information`} className={classNamesActive}>
                    Information
                </NavLink>
                <NavLink to={`/${binId}/config`} className={classNamesActive}>
                    Config
                </NavLink>
                <a className={"p-4 text-zinc-100"} onClick={copyToClipboard}>
                    <FaCopy  color={"white"} >Test</FaCopy>
                </a>
            </div>
        </header>
    );
}
export default Navigation;