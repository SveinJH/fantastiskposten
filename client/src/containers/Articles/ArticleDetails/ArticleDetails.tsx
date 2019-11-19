import React, { Component } from 'react';
import { articleService } from '../../../assets/services/services';

import classes from './ArticleDetails.module.scss';
import ArticleEdit from '../../../components/Articles/ArticleEdit/ArticleEdit';
import ArticleRating from '../../../components/Articles/ArticleRating/ArticleRating';

type ArticleDetailsState = {
    article: {
        title: string;
        description: string;
        image: string;
        category: string;
        importance: number;
        comments: [
            {
                author: string;
                content: string;
            }
        ];
        rating: {
            totalRating: number;
            ratersCount: number;
        };
    };
    tempArticle: any;
    date: any;
    newComment: {
        author: string;
        content: string;
    };
    currentRating: number;
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
            importance: 0,
            comments: [
                {
                    author: '',
                    content: ''
                }
            ],
            rating: {
                totalRating: 0,
                ratersCount: 0
            }
        },
        tempArticle: {},
        date: '',
        newComment: {
            author: '',
            content: ''
        },
        currentRating: 0
    };

    componentDidMount() {
        articleService.getArticle(this.props.match.params.id).then(article => {
            // Formatere dato til eks: 'MON, 28 OCT 2019 18:02'
            let date = new Date(article.data.article.createdAt).toUTCString();
            date = date.substring(0, date.length - 7);

            let currentRating = parseFloat(
                (
                    article.data.article.rating.totalRating /
                    article.data.article.rating.ratersCount
                ).toFixed(1)
            );
            if (!currentRating) currentRating = 0;

            this.setState({
                article: article.data.article,
                tempArticle: article.data.article,
                date,
                currentRating
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

    // Håndtere ny kommentar
    handleNewComment = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newComments = this.state.article.comments.map(comment => {
            return { author: comment.author, content: comment.content };
        });

        if (this.state.newComment) {
            const author = this.state.newComment.author;
            const content = this.state.newComment.content;
            newComments.push({ author, content });

            articleService
                .updateComments(this.props.match.params.id, newComments)
                .then(data => {
                    this.setState({
                        article: data.data.article,
                        newComment: { author: '', content: '' }
                    });
                });
        }
    };

    // Hådtere endring i kommentarfeltene
    handleCommentChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;

        const newComment = {
            ...this.state.newComment,
            [target.name]: target.value
        };

        this.setState({ newComment });
    };

    // Håndtere endring i rating
    handleRatingChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        const totalRating: number =
            this.state.article.rating.totalRating + parseInt(target.value);
        const ratersCount: number = this.state.article.rating.ratersCount + 1;
        const newRating: number = parseFloat(
            (totalRating / ratersCount).toFixed(1)
        );

        const article = {
            ...this.state.article,
            rating: {
                totalRating,
                ratersCount
            }
        };

        articleService
            .updateRating(this.props.match.params.id, article.rating)
            .then(data => {
                this.setState({ article, currentRating: newRating });
            });
    };

    render() {
        let currentComments;
        if (this.state.article.comments.length > 0) {
            currentComments = this.state.article.comments.map((comment, i) => {
                return (
                    <div key={i} className={classes.ArticleDetails__comment}>
                        <p className={classes.ArticleDetails__comment__content}>
                            {comment.content}
                        </p>
                        <h5 className={classes.ArticleDetails__comment__author}>
                            - {comment.author}
                        </h5>
                    </div>
                );
            });
        }

        return (
            <div className={classes.ArticleDetails}>
                <ArticleRating
                    rating={this.state.currentRating}
                    clicked={this.handleRatingChange}
                />
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
                    <div className={classes.ArticleDetails__commentsContainer}>
                        <h3>Kommentarer</h3>
                        <div className={classes.ArticleDetails__comments}>
                            {currentComments}
                        </div>
                        <div className={classes.ArticleDetails__newComment}>
                            <form onSubmit={this.handleNewComment}>
                                <h3>Legg inn en kommentar:</h3>
                                <p>Ditt navn:</p>
                                <input
                                    name="author"
                                    value={this.state.newComment.author}
                                    onChange={this.handleCommentChange}
                                    type="text"
                                    required
                                />
                                <p>Kommentar:</p>
                                <input
                                    name="content"
                                    value={this.state.newComment.content}
                                    onChange={this.handleCommentChange}
                                    type="text"
                                    required
                                />
                                <input
                                    type="submit"
                                    value="Kommenter"
                                    className="Button--save Button"
                                />
                            </form>
                        </div>
                    </div>
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
