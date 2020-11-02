import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import useToggle from '../../hooks/useToggle';
import { Button } from 'reactstrap';
import TokenContext from '../../utils/tokenContext';
import './Login.css';

const Login = () => {
  const history = useHistory();
  const { token, setToken } = useContext(TokenContext);
  const [loginVisible, toggleLoginVisible] = useToggle(true);

  if (token) {
    history.push('/');
    setToken(null);

    return <Redirect to="/" />;
  }

  return (
    <div className="Login pt-5 row">
      <div className="col-6 mx-auto">
        <div className="Login-nav text-right">
          <Button
            color="primary"
            className={`nav-btn nav-btn-left ${loginVisible ? 'active' : ''}`}
            onClick={() => toggleLoginVisible(!loginVisible ? true : false)}
          >
            Login
          </Button>
          <Button
            color="primary"
            className={`nav-btn nav-btn-right ${loginVisible ? '' : 'active'}`}
            onClick={() => toggleLoginVisible(loginVisible ? true : false)}
          >
            Sign up
          </Button>
        </div>
        {loginVisible ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Login;
