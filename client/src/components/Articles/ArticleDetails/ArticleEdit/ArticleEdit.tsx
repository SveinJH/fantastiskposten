import React from 'react';
import Popup from 'reactjs-popup';

import classes from './ArticleEdit.module.scss';

type ArticleEditProps = {
    article: any;
    saved: any;
    changed: any;
    checkboxChanged: any;
};

const articleEdit = ({
    article,
    saved,
    changed,
    checkboxChanged
}: ArticleEditProps) => (
    <Popup trigger={<button className="Button"> Rediger sak </button>} modal>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header"> Rediger sak</div>
                <div className="content">
                    <form onSubmit={saved}>
                        <label>
                            <p>Overskrift</p>
                            <input
                                name="title"
                                type="text"
                                required
                                value={article.title}
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
                                value={article.description}
                                onChange={changed}
                            />
                        </label>

                        <label>
                            <p>Bilde (url)</p>
                            <input
                                name="image"
                                type="text"
                                required
                                value={article.image}
                                onChange={changed}
                            />
                        </label>

                        <label>
                            <p>Kategori</p>
                            <select
                                name="category"
                                value={article.category}
                                onChange={changed}
                            >
                                <option value="Nyheter">Nyheter</option>
                                <option value="Underholdning">
                                    Underholdning
                                </option>
                                <option value="Sport">Sport</option>
                            </select>
                        </label>

                        <label>
                            {'Viktig?'}
                            <input
                                name="importance"
                                type="checkbox"
                                onChange={checkboxChanged}
                            />
                        </label>

                        <input type="submit" value="Lagre" />
                    </form>
                </div>
                <div className="actions">
                    <button
                        onClick={() => {
                            close();
                        }}
                    >
                        Lukk
                    </button>
                </div>
            </div>
        )}
    </Popup>
);

export default articleEdit;
