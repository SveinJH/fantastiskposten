import React, { Component } from 'react';
import { articleService } from '../../../assets/services/services';

import classes from './ArticleDetails.module.scss';
import ArticleEdit from './ArticleEdit/ArticleEdit';

type ArticleDetailsState = {
    article: {
        title: string;
        description: string;
        image: string;
        category: string;
        importance: number;
    };
    tempArticle: any;
    date: any;
};

export default class ArticleDetails extends Component<
    { match: { params: { id: string } }; history: any },
    ArticleDetailsState
> {
    state: ArticleDetailsState = {
        article: {
            title: '',
            description: '',
            image: '',
            category: '',
            importance: 0
        },
        tempArticle: {},
        date: ''
    };

    componentDidMount() {
        articleService.getArticle(this.props.match.params.id).then(article => {
            // Formatere dato til eks: 'MON, 28 OCT 2019 18:02'
            let date = new Date(article.data.article.createdAt).toUTCString();
            date = date.substring(0, date.length - 7);

            this.setState({
                article: article.data.article,
                tempArticle: article.data.article,
                date
            });
        });
    }

    // Håndtere endringer i form
    handleChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;

        const currentArticle = {
            ...this.state.tempArticle,
            [target.name]: target.value
        };

        this.setState({ tempArticle: currentArticle });
    };

    // Håndtere endring på checkbox
    handleCheckbox = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        let importance;
        target.checked ? (importance = 1) : (importance = 2);

        const newArticle = {
            ...this.state.tempArticle,
            importance: importance
        };

        this.setState({ tempArticle: newArticle });
    };

    // Oppdatere artikkel
    handleSave = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const changedArticle = {
            ...this.state.tempArticle
        };

        articleService
            .updateArticle(this.props.match.params.id, changedArticle)
            .then(article => {
                this.setState({
                    article: article.data.article,
                    tempArticle: article.data.article
                });
            });
    };

    // Slette artikkel
    handleDelete = (event: React.SyntheticEvent) => {
        if (window.confirm('Er du sikker?')) {
            articleService
                .deleteArticle(this.props.match.params.id)
                .then(data => {
                    this.props.history.push(
                        `/${this.state.article.category.toLowerCase()}`
                    );
                });
        }
    };

    render() {
        return (
            <div className={classes.ArticleDetails}>
                <div className={classes.ArticleDetails__item}>
                    <h1 className={classes.ArticleDetails__title}>
                        {this.state.article.title}
                    </h1>

                    <img
                        className={classes.ArticleDetails__img}
                        src={this.state.article.image}
                        alt={this.state.article.title}
                    />

                    <div className={classes.ArticleDetails__info}>
                        <div className={classes.ArticleDetails__info__item}>
                            {this.state.article.category}
                        </div>
                        <div className={classes.ArticleDetails__info__item}>
                            {this.state.date}
                        </div>
                    </div>
                    <p className={classes.ArticleDetails__description}>
                        {this.state.article.description}
                    </p>
                </div>
                <div className={classes.ArticleDetails__controls}>
                    <ArticleEdit
                        article={this.state.tempArticle}
                        changed={this.handleChange}
                        checkboxChanged={this.handleCheckbox}
                        saved={this.handleSave}
                    />
                    <button
                        className="Button Button--delete"
                        onClick={this.handleDelete}
                    >
                        Slett sak
                    </button>
                </div>
            </div>
        );
    }
}
