export interface PluginInfo {
    version: string;
    enabled: boolean;
    main: string;
    authors: string[];
    dependencies: string[];
    "soft-dependencies": string[];
    provides: string[];
    "load-before": string[];
}