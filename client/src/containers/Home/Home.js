/* tslint:disable */

import React, { Component } from 'react';
import { articleService } from '../../assets/services/services';

import ArticlesPreview from '../../components/Articles/ArticlesPreview/ArticlesPreview';
import Livefeed from '../../components/Livefeed/Livefeed';
import classes from './Home.module.scss';

export default class Home extends Component {
    state = {
        articles: []
    };

    async componentDidMount() {
        let query = '';
        if (this.props[0]) {
            query = `?category=${this.props[0]}`;
        } else {
            query = '?importance=1';
        }

        try {
            const articles = await articleService.getArticle(query);
            this.setState({ articles: articles.data.articles });
        } catch (err) {
            console.log(err);
        }

        /* await articleService
            .getArticles(query)
            .then(articles => {
                this.setState({ articles: articles.data.articles });
            })
            .catch(error => console.log(error.message)); */
    }

    handleClick = event => {
        const id = event.currentTarget.id;

        if (id) {
            this.props.history.push(`/artikler/${id}`);
        }
    };

    render() {
        return (
            <div>
                <Livefeed
                    items={this.state.articles}
                    clicked={this.handleClick}
                />
                <main className={classes.Home}>
                    <ArticlesPreview
                        articles={this.state.articles}
                        clicked={this.handleClick}
                    />
                </main>
            </div>
        );
    }
}
