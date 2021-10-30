import React from 'react';
import Home from './pages/Home';
import Questions from './pages/Questions';
import QuestionDetails from './pages/QuestionDetails';
import NewQuestion from './pages/NewQuestion';

import PageNotFound from './pages/PageNotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="main-layout">
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/question' exact>
            <NewQuestion/>
          </Route>
          <Route path='/questions' exact>
            <Questions/>
          </Route>
          <Route path="/questions/:id">
            <QuestionDetails/>
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
