import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import JobsList from './components/JobsList/JobsList';
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
    <PrivateRoute path="/jobs" exact>
      <JobsList />
    </PrivateRoute>
    <PrivateRoute path="/companies" exact>
      <CompaniesList />
    </PrivateRoute>
    <Route exact path="/companies/:handle">
      <CompanyDetail />
    </Route>
    <PrivateRoute path="/profile" exact>
      <Profile />
    </PrivateRoute>
    <Redirect to="/" />
  </Switch>
);

export default Routes;
