import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import classes from './Header.module.scss';

const links = [
    { route: '/nyheter', name: 'Nyheter' },
    { route: '/sport', name: 'Sport' },
    { route: '/underholdning', name: 'Underholdning' },
    { route: '/nyartikkel', name: 'Registrer ny sak' }
];

const header = () => {
    return (
        <ul className={classes.header}>
            <Link
                className={`${classes.header__logo} ${classes.header__item}`}
                to={'/'}
            >
                Fantastiskposten
            </Link>
            {links.map(link => {
                return (
                    <Link
                        className={classes.header__item}
                        to={link.route}
                        key={link.route}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </ul>
    );
};

export default header;
