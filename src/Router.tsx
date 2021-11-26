import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Projects from './routes/projects/Projects';
import Coin from './routes/projects/crypto/Coin';
import Coins from './routes/projects/crypto/Coins';
import ToDoList from './routes/projects/to-do/ToDoList';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/crypto/:coinId">
          <Coin />
        </Route>
        <Route path="/crypto">
          <Coins />
        </Route>
        <Route path="/to-do">
          <ToDoList />
        </Route>
        <Route path="/">
          <Projects />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
