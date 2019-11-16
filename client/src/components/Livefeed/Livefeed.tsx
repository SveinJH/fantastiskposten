import * as React from 'react';
import Marquee from 'react-double-marquee';

import classes from './Livefeed.module.scss';

type LivefeedProps = {
    items: [{ title: string; createdAt: string; id: string }];
    clicked: any;
};

const livefeed = ({ items, clicked }: LivefeedProps) => {
    const livefeedItems = items.map(item => {
        const date = new Date(item.createdAt).toUTCString();
        item.createdAt = date.substring(0, date.length - 7);

        return (
            <span
                key={item.id}
                id={item.id}
                onClick={clicked}
                className={classes.Livefeed__item}
            >
                <span onClick={clicked} className="Margin--right">
                    &#9898;
                </span>
                <span>{item.title} / </span>
                <span className={classes.Livefeed__item__createdAt}>
                    {item.createdAt}
                </span>
            </span>
        );
    });

    return (
        <div
            style={{
                textTransform: 'uppercase',
                marginTop: '2rem',
                marginLeft: '5vw',
                width: '90vw',
                whiteSpace: 'nowrap',
                letterSpacing: '1px',
                fontSize: '1.4rem'
            }}
        >
            <Marquee style={{ marginLeft: '5rem' }} delay={250} speed={0.06}>
                {livefeedItems}
            </Marquee>
        </div>
    );
};

export default livefeed;
