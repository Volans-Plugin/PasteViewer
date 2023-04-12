import JSZip from "jszip";
import {Params} from "react-router-dom";

const BASE_URL = "https://paste.grim.ac/data/";
const ZIP = new JSZip();

export interface ZipInformation {
    latestLog: string;
    config: string;
    information: string;
}


export async function getZipData({params}: {params: Params}): Promise<ZipInformation> {
    let response = await fetch(`${BASE_URL}${params.binId}`);
    let value = await response.body?.getReader().read();
    if (value == null) return {latestLog: "", config: "", information: ""};
    let zipFile = await ZIP.loadAsync(value!.value as Uint8Array);
    let folder = zipFile.folder("zip");
    let latestLog = await folder?.file("latest.log")?.async("string");
    let config = await folder?.file("config.conf")?.async("string");
    let information = await folder?.file("information.yml")?.async("string");
    return Promise.resolve({latestLog: latestLog ?? "", config: config ?? "", information: information ?? ""});
}