import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Easing from './pages/easing';
import VectorDemo from './pages/vector';
// import s from './App.module.css';

const routes = [
  {
    path: '/vector',
    component: VectorDemo,
  },
  {
    path: '/easing',
    component: Easing,
  }
];

function App() {
  return (
    <Router>
      <Switch>
        {/*<Route exact path="/" component={Home} />*/}
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            component={Component}
            // render={() => <Component className={s.full} />}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
