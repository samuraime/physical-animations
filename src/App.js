import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Easing from './pages/easing';
import Spring from './pages/spring';
import VectorDemo from './pages/vector';
import s from './App.module.css';

const routes = [
  {
    path: '/vector',
    component: VectorDemo,
  },
  {
    path: '/easing',
    component: Easing,
  },
  {
    path: '/spring',
    component: Spring,
    isCanvas: true,
  },
];

function App() {
  return (
    <Router>
      <Switch>
        {/*<Route exact path="/" component={Home} />*/}
        {routes.map(({ path, component: Component, isCanvas }) => (
          <Route
            key={path}
            path={path}
            component={isCanvas
               ? () => <Component className={s.full} />
               : Component
            }
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
