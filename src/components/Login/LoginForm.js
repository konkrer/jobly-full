import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import JoblyApi from '../../utils/JoblyApi';
import TokenContext from '../../utils/tokenContext';

const LoginForm = () => {
  const history = useHistory();
  const { setToken } = useContext(TokenContext);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const resp = await JoblyApi.login(user);

    if (resp.status === 401) setErrors(() => ['Invalid Credentials']);
    else {
      history.push('/');
      setToken(resp.token);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setUser(user => ({
      ...user,
      [name]: value,
    }));
  };

  return (
    <Form className="card-style2 rounded text-left p-3" onSubmit={handleSubmit}>
      <FormGroup onSubmit={handleSubmit}>
        <Label for="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      {errors.length
        ? errors.map((e, i) => (
            <Alert color="danger" key={i}>
              <small>{e}</small>
            </Alert>
          ))
        : null}
      <div className="text-right">
        <Button color="primary">Submit</Button>
      </div>
    </Form>
  );
};

export default LoginForm;
