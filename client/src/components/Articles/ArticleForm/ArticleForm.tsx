import React from 'react';

import classes from './ArticleForm.module.scss';

type ArticleFormProps = {
    title: string;
    description: string;
    image: string;
    category: string;
    changed: any;
    checkboxChanged: any;
    saved: any;
};

// Gjenbrukbar Form component for bruk i både opprettelse og endring av artikkel
const articleForm = ({
    title,
    description,
    image,
    category,
    changed,
    checkboxChanged,
    saved
}: ArticleFormProps) => {
    return (
        <form className={classes.Form} onSubmit={saved}>
            <label>
                <p>Overskrift</p>
                <input
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={changed}
                />
            </label>

            <label>
                <p>Innhold</p>
                <textarea
                    name="description"
                    rows={4}
                    cols={30}
                    required
                    value={description}
                    onChange={changed}
                />
            </label>

            <label>
                <p>Bilde (url)</p>
                <input
                    name="image"
                    type="text"
                    required
                    value={image}
                    onChange={changed}
                />
            </label>

            <label>
                <p>Kategori</p>
                <select name="category" value={category} onChange={changed}>
                    <option value="Nyheter">Nyheter</option>
                    <option value="Underholdning">Underholdning</option>
                    <option value="Sport">Sport</option>
                </select>
            </label>

            <label>
                <p>Viktig?</p>
                <input
                    name="importance"
                    type="checkbox"
                    onChange={checkboxChanged}
                />
            </label>

            <input
                type="submit"
                value="Lagre"
                className="Button Button--save"
            />
        </form>
    );
};

export default articleForm;
