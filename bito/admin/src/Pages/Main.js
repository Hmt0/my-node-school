import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AdminIndex from "./AdminIndex";
import Login from "./Login";

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />}></Route>
                <Route path="/index//*" exact element={<AdminIndex />}></Route>
            </Routes>
            
        </Router>
    )
}

export default Main