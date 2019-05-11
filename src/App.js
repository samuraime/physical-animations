import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Easing } from './pages/easing';
import { Spring } from './pages/spring';
import { Distribution, BetTable } from './pages/distribution';
import VectorDemo from './pages/vector';

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
  {
    path: '/distribution',
    component: Distribution,
    exact: true,
  },
  {
    path: '/distribution/bet-table',
    component: BetTable,
  },
];

function App() {
  return (
    <Router>
      <Switch>
        {routes.map(item => (
          <Route key={item.path} {...item} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
