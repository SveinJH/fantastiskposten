import React from 'react';

import ArticlePreview from './ArticlePreview/ArticlePreview';

type ArticlesPreviewProps = {
    articles: [
        {
            _id: string;
            title: string;
            description: string;
            image: string;
            category: string;
        }
    ];
    clicked: any;
};

const articlesPreview = ({ articles, clicked }: ArticlesPreviewProps) => {
    return articles.map(article => {
        return (
            <ArticlePreview
                id={article._id}
                title={article.title}
                image={article.image}
                key={article._id}
                clicked={clicked}
            />
        );
    });
};

export default articlesPreview;
