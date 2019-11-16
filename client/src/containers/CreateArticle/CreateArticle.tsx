import React, { Component } from 'react';
import { articleService } from '../../assets/services/services';

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
                <form className={classes.Form} onSubmit={this.handleSubmit}>
                    <label>
                        <p>
                            Overskrift <span className="Required">*</span>
                        </p>
                        <input
                            name="title"
                            type="text"
                            value={this.state.newArticle.title}
                            onChange={this.handleChange}
                            required
                        />
                    </label>

                    <label>
                        <p>
                            Innhold <span className="Required">*</span>
                        </p>
                        <textarea
                            name="description"
                            value={this.state.newArticle.description}
                            onChange={this.handleChange}
                            rows={4}
                            cols={30}
                            required
                        />
                    </label>

                    <label>
                        <p>
                            Bilde (url) <span className="Required">*</span>
                        </p>
                        <input
                            name="image"
                            type="text"
                            value={this.state.newArticle.image}
                            onChange={this.handleChange}
                            required
                        />
                    </label>

                    <label>
                        <p>
                            Kategori <span className="Required">*</span>
                        </p>
                        <select name="category" onChange={this.handleChange}>
                            <option value="Nyheter">Nyheter</option>
                            <option value="Underholdning">Underholdning</option>
                            <option value="Sport">Sport</option>
                        </select>
                    </label>

                    <label>
                        {'Viktig?'}
                        <input
                            name="importance"
                            type="checkbox"
                            onChange={this.handleCheckbox}
                        />
                    </label>

                    <input type="submit" value="Registrer" />
                </form>
            </div>
        );
    }
}
