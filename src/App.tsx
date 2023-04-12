import React from 'react';
import './App.css';
import {Navigate, useParams} from "react-router-dom";
function App() {
    const params = useParams();
    const binId = params.binId;
    return (
        <Navigate to={`/${binId}/latestlog`} />
    );
}

export default App;
