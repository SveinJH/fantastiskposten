/* tslint:disable */

import React, { Component } from 'react';
import { articleService } from '../../assets/services/services';

import ArticlesPreview from '../../components/Articles/ArticlesPreview/ArticlesPreview';
import Livefeed from '../../components/Livefeed/Livefeed';
import classes from './Home.module.scss';

export default class Home extends Component {
    state = {
        articles: [],
        livefeedItems: []
    };

    async componentDidMount() {
        let query = '';
        if (this.props[0]) {
            query = `?category=${this.props[0]}`;
        } else {
            query = '?importance=1&limit=20';
        }

        try {
            const articles = await articleService.getArticle(query);
            const livefeedItems = await articleService.getLivefeedItems();
            this.setState({
                articles: articles.data.articles,
                livefeedItems: livefeedItems.data
            });
        } catch (err) {
            console.log(err);
        }
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
                    items={this.state.livefeedItems}
                    clicked={this.handleClick}
                />
                <h1>{this.props[0]}</h1>
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
