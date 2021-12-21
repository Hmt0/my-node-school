import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./Login";

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/login/" exact element={<Login />}></Route>
            </Routes>
            
        </Router>
    )
}

export default Main