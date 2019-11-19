import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import classes from './App.module.scss';

import Header from '../components/Header/Header';
import Home from './Home/Home';
import ArticleDetails from './Articles/ArticleDetails/ArticleDetails';
import CreateArticle from './CreateArticle/CreateArticle';

type AppState = {
    categories: string[][];
};

class App extends Component<{}, AppState> {
    state: AppState = {
        categories: [['Nyheter'], ['Sport'], ['Underholdning']]
    };

    render() {
        return (
            <HashRouter>
                <div className={classes.App}>
                    <Header />
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/nyheter"
                        render={routeProps => (
                            <Home
                                {...routeProps}
                                {...this.state.categories[0]}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/sport"
                        render={routeProps => (
                            <Home
                                {...routeProps}
                                {...this.state.categories[1]}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/underholdning"
                        render={routeProps => (
                            <Home
                                {...routeProps}
                                {...this.state.categories[2]}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/artikler/:id"
                        component={ArticleDetails}
                    />
                    <Route exact path="/nyartikkel" component={CreateArticle} />
                </div>
            </HashRouter>
        );
    }
}

export default App;
