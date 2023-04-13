import {Volans} from "./Volans";
import {Server} from "./Server";

export interface Information {
    version: number;
    volans: Volans;
    server: Server;
    uptime:                 number;
    "jvm-flags":            string[];
    "free-memory":          number;
    "max-memory":           number;
    "total-memory":         number;
    "available-processors": number;
    "java-name":            string;
    "java-version":         string;
    "java-vendor":          string;
    "operating-system":     string;
    "os-version":           string;
    "os-arch":              string;
}