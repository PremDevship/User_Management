import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import Details from "./Details";
import Userdashboard from "./User_Dashboard";


function Router(){
    return(
        <div>
            <BrowserRouter>
            <Route exact path="/" component={Userdashboard} />
            <Route path="/details" component={Details} />
            </BrowserRouter>
        </div>
    )
}
export default Router;