import React from 'react';
import Popup from 'reactjs-popup';

import ArticleForm from '../ArticleForm/ArticleForm';
import classes from './ArticleEdit.module.scss';

type ArticleEditProps = {
    article: {
        title: string;
        description: string;
        image: string;
        category: string;
    };
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
            <div>
                <a onClick={close}>&times;</a>
                <div className={classes.ArticleEdit__title}> Rediger sak</div>
                <div className={classes.ArticleForm}>
                    <ArticleForm
                        title={article.title}
                        description={article.description}
                        image={article.image}
                        category={article.category}
                        changed={changed}
                        checkboxChanged={checkboxChanged}
                        saved={saved}
                    />
                </div>
                <div>
                    <button
                        style={{ padding: '0.2rem 1rem' }}
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
