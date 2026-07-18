export {};

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            version: string;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
