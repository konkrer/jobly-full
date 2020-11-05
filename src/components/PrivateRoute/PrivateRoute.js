import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenContext from '../../utils/tokenContext';

const PrivateRoute = ({ path, exact, children }) => {
  const { userData } = useContext(TokenContext);

  if (!userData.token) return <Redirect to="/login" />;

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
