import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

function Navigation({ routes }) {
  return (
    <ul className={s.root}>
      {routes.map(({ path, name }) => (
        <li>
          <NavLink exact to={path} className={s.link} activeClassName={s.activeLink}>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default memo(Navigation);