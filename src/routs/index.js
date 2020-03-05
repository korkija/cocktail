import React from "react";
import {Route, Switch} from "react-router-dom";
import {CocktailCardDetails} from '../components/CocktailCardDetails';
import {CocktailsListFiltersContainer} from "../components/CocktailsListFilters";

const Main = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={CocktailsListFiltersContainer}/>
                <Route path="/details" component={CocktailCardDetails}/>
            </Switch>
        </div>

    );
};

export  default Main;
