import React from 'react';
import './App.css';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={'/'}>Search</NavLink>
      </nav>
      <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} component={Pokemon} />
        <Redirect to={'/'} />
      </Switch>
    </div>
  );
}

export default App;
