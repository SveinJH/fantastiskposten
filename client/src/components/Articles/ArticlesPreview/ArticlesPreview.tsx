import React from 'react';

import ArticlePreview from './ArticlePreview/ArticlePreview';

type ArticlesPreviewProps = {
    articles: any;
    clicked: any;
};

const articlesPreview = ({ articles, clicked }: ArticlesPreviewProps) => {
    return articles.map((article: any) => {
        return (
            <ArticlePreview
                id={article.id}
                title={article.title}
                image={article.image}
                key={article.id}
                clicked={clicked}
            />
        );
    });
};

export default articlesPreview;
