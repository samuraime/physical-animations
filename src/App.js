import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NoiseFlowField } from './pages/field';
import { Easing } from './pages/easing';
import { Spring } from './pages/spring';
import { Distribution, BetTable } from './pages/distribution';
import { UniformlyAcceleratedMotion, Shopping, Lottery } from './pages/motion';
import { SimpleMotion, BrownianMotion, NoiseMotion } from './pages/random-motion';
import { Gravity } from './pages/gravity';
import { NodeGarden } from './pages/particles';
import Navigation from './components/Navigation';
import s from './App.module.css';

const fullScreen = Component => () => <Component className={s.fullScreen} />;

const routes = [
  {
    path: '/',
    component: fullScreen(NoiseFlowField),
    exact: true,
    name: '首页',
  },
  {
    path: '/motion/uniform-acceleration',
    component: fullScreen(UniformlyAcceleratedMotion),
    name: '匀加速运动',
  },
  {
    path: '/easing',
    component: Easing,
    name: '缓动',
  },
  {
    path: '/spring',
    component: fullScreen(Spring),
    name: '弹动',
  },
  {
    path: '/motion/shopping',
    component: Shopping,
    name: '二维运动 - 购物车',
  },
  {
    path: '/motion/lottery',
    component: Lottery,
    name: '二维运动 - 抽奖',
  },
  {
    path: '/gravity',
    component: fullScreen(Gravity),
    name: '重力',
  },
  {
    path: '/random-motion/simple',
    component: fullScreen(SimpleMotion),
    name: '随机运动 - 简单版',
  },
  {
    path: '/random-motion/brownian',
    component: fullScreen(BrownianMotion),
    name: '随机运动 - 布朗运动',
  },
  {
    path: '/random-motion/noise',
    component: fullScreen(NoiseMotion),
    name: '随机运动 - 噪声',
  },
  {
    path: '/distribution',
    component: Distribution,
    exact: true,
    name: '随机分布',
  },
  {
    path: '/distribution/bet-table',
    component: BetTable,
    name: '随机分布 - 押筹码',
  },
  {
    path: '/particles/node-garden',
    component: fullScreen(NodeGarden),
    name: '粒子系统 - Node Garden',
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
      <Navigation routes={routes} />
    </Router>
  );
}

export default App;
