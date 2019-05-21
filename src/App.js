import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Easing } from './pages/easing';
import { Spring } from './pages/spring';
import { Distribution, BetTable } from './pages/distribution';
import { Shopping } from './pages/motion';
import { SimpleMotion, BrownianMotion, NoiseMotion } from './pages/random-motion';
import { Capture } from './pages/gravity';
import s from './App.module.css';

const fullScreen = Component => () => <Component className={s.fullScreen} />;

const routes = [
  {
    path: '/easing',
    component: Easing,
  },
  {
    path: '/spring',
    component: fullScreen(Spring),
  },
  {
    path: '/random-motion/simple',
    component: fullScreen(SimpleMotion),
  },
  {
    path: '/random-motion/brownian',
    component: fullScreen(BrownianMotion),
  },
  {
    path: '/random-motion/noise',
    component: fullScreen(NoiseMotion),
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
  {
    path: '/motion/shopping',
    component: Shopping,
  },
  {
    path: '/gravity',
    component: fullScreen(Capture),
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
