import React from "react";
import ReactDOM from "react-dom";

import Dashboard from "./Dashboard";
import Store from "./Store";

const App = () => {

    return (
        <>
            <Store>
                <Dashboard />
            </Store>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);