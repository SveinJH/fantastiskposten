import React from 'react';
import classes from './ArticleRating.module.scss';

type articleRatingProps = {
    rating: number;
    clicked: any;
};

const articleRating = ({ rating, clicked }: articleRatingProps) => {
    return (
        <div>
            Vurdering
            <div className={classes.ArticleRating__display}>
                {rating}{' '}
                <span className={classes.ArticleRating__display_small}>
                    / 5
                </span>
            </div>
            Vurdér saken:
            <div className={classes.ArticleRating__buttons}>
                <button onClick={clicked} value={1}>
                    1
                </button>
                <button onClick={clicked} value={2}>
                    2
                </button>
                <button onClick={clicked} value={3}>
                    3
                </button>
                <button onClick={clicked} value={4}>
                    4
                </button>
                <button onClick={clicked} value={5}>
                    5
                </button>
            </div>
        </div>
    );
};

export default articleRating;
