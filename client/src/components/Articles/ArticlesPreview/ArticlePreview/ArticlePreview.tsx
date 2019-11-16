import React from 'react';

import classes from './ArticlePreview.module.scss';

type ArticlePreviewProps = {
    image: string;
    title: string;
    clicked: any;
    id: string;
};

const articlePreview = ({ image, title, clicked, id }: ArticlePreviewProps) => {
    return (
        <div className={classes.ArticlePreview}>
            <img
                className={classes.ArticlePreview__img}
                src={image}
                alt={title}
                onClick={clicked}
                id={id}
            />
            <h1 className={classes.ArticlePreview__title}>{title}</h1>
        </div>
    );
};

export default articlePreview;
