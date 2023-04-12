import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import Latestlog from "./components/latestlog/Latestlog";
import Config from "./components/config/Config";
import Information from "./components/information/Information";
import App from "./App";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            },
        },
    }
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
    {
        id: "root",
        path: "/:binId/",
        children: [
            {
                path: "",
                element: <App/>,
            },
            {
                path: "latestlog",
                element: <Latestlog/>,
            },
            {
                path: "config",
                element: <Config/>,
            },
            {
                path: "information",
                element: <Information/>,
            }
        ]
    },
]);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>
);

