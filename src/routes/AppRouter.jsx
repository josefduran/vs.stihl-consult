
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LayoutHome } from "../components/Layout/LayoutHome";
import { OptionsPage } from "../components/Pages/OptionsPage";
import { Catalog } from "../components/Pages/Catalog";
import { SearchPage } from "../components/Pages/SearchPage";


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>

                    <Route path="/search" component={SearchPage} />
                    <Route path="/options" component={OptionsPage} />
                    <Route path="/catalog" component={Catalog} />
                    <Route path="/" component={LayoutHome} />
                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>
    )
}
