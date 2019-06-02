import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NoiseFlowField } from './pages/field';
import { Easing } from './pages/easing';
import { Spring } from './pages/spring';
import { Distribution, BetTable } from './pages/distribution';
import { UniformlyAcceleratedMotion, Shopping } from './pages/motion';
import { SimpleMotion, BrownianMotion, NoiseMotion } from './pages/random-motion';
import { Gravity } from './pages/gravity';
import { NodeGarden } from './pages/particles';
import s from './App.module.css';

const fullScreen = Component => () => <Component className={s.fullScreen} />;

const routes = [
  {
    path: '/',
    component: fullScreen(NoiseFlowField),
    exact: true,
  },
  {
    path: '/motion/uniform-acceleration',
    component: fullScreen(UniformlyAcceleratedMotion),
  },
  {
    path: '/easing',
    component: Easing,
  },
  {
    path: '/spring',
    component: fullScreen(Spring),
  },
  {
    path: '/motion/shopping',
    component: Shopping,
  },
  {
    path: '/gravity/simple',
    component: fullScreen(Gravity),
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
    path: '/particles/node-garden',
    component: fullScreen(NodeGarden),
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
