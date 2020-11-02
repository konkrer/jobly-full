import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import JobsList from './components/JobsList/JobsList';
import Job from './components/Job/Job';
import CompaniesList from './components/CompaniesList/CompaniesList';
import CompanyDetail from './components/CompanyDetail/CompanyDetail';
import Profile from './components/Profile/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/jobs">
      <JobsList />
    </Route>
    <Route exact path="/jobs/:id">
      <Job />
    </Route>
    <Route exact path="/companies">
      <CompaniesList />
    </Route>
    <Route exact path="/companies/:handle">
      <CompanyDetail />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Redirect to="/" />
  </Switch>
);

export default Routes;
