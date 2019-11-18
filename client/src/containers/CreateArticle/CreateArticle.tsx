import React, { Component } from 'react';
import { articleService } from '../../assets/services/services';

import ArticleForm from '../../components/Articles/ArticleForm/ArticleForm';
import classes from './CreateArticle.module.scss';

type CreateArticleProps = {
    history: any;
};

type CreateArticleState = {
    newArticle: {
        title: string;
        description: string;
        image: string;
        category: string;
        importance: number;
    };
};

export default class CreateArticle extends Component<
    CreateArticleProps,
    CreateArticleState
> {
    state: CreateArticleState = {
        newArticle: {
            title: '',
            description: '',
            image: '',
            category: 'Nyheter',
            importance: 2
        }
    };

    handleChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;

        const newArticle = {
            ...this.state.newArticle,
            [target.name]: target.value
        };

        this.setState({ newArticle });
    };

    handleCheckbox = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        let importance;
        target.checked ? (importance = 1) : (importance = 2);

        const newArticle = {
            ...this.state.newArticle,
            importance: importance
        };

        this.setState({ newArticle });
    };

    // Registrere ny artikkel
    handleNewArticle = async () => {
        try {
            console.log(Date.now());

            const newArticle: object = {
                ...this.state.newArticle,
                createdAt: Date.now()
            };

            await articleService.createArticle(newArticle);

            alert('Artikkel registrert.');

            // Omdirigere til den aktuelle kategorien
            this.props.history.push(
                `/${this.state.newArticle.category.toLowerCase()}`
            );
        } catch (err) {
            alert('Feil ved registrering av ny artikkel.');
        }
    };

    // Håndtere submit knapp
    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        this.handleNewArticle();
    };

    render() {
        return (
            <div className={classes.CreateArticle}>
                <h2 className={classes.CreateArticle__heading}>Ny artikkel</h2>
                <ArticleForm
                    title={this.state.newArticle.title}
                    description={this.state.newArticle.description}
                    image={this.state.newArticle.image}
                    category={this.state.newArticle.category}
                    changed={this.handleChange}
                    checkboxChanged={this.handleCheckbox}
                    saved={this.handleSubmit}
                />
            </div>
        );
    }
}
