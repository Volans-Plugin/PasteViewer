import {Datapack} from "./Datapack";
import {PluginInfo} from "./Plugin";

export interface Server {
    version: string;
    plugins: number;
    plugin: Record<string, PluginInfo>
    datapacks: Datapack;
}