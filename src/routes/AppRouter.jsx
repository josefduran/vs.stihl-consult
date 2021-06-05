import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LayoutHome } from "../components/LayoutHome";
import { SearchPage} from "../components/Pages/SearchPage";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/search" component={SearchPage}/>
                    <Route path="/" component={LayoutHome}/>
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
