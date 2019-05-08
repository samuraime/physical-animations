import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from './pages/Home';
import VectorDemo from './pages/Vector';
import s from './App.module.css';

const routes = [
  {
    path: '/vector',
    component: VectorDemo,
  },
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
            render={() => <Component className={s.full} />}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
