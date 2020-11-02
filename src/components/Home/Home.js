import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import TokenContext from '../../utils/tokenContext';
import './Home.css';

const Home = () => {
  const { token } = useContext(TokenContext);

  let greeting;

  if (token) {
    greeting = <h2 className="">Welcome Back!</h2>;
  } else {
    greeting = (
      <Link to="/login">
        <Button color="primary" className="font-weight-bold Home-btn">
          Log In
        </Button>
      </Link>
    );
  }

  return (
    <div className="Home">
      <h1 className="display-5 mb-4 font-weight-bold">Jobly</h1>
      <h2 className="lead mb-4">All the jobs in one, convenient place.</h2>
      {greeting}
    </div>
  );
};

export default Home;
