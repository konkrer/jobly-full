import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import JoblyApi from '../../utils/JoblyApi';
import TokenContext from '../../utils/tokenContext';

const LoginForm = () => {
  const history = useHistory();
  const { setUserData } = useContext(TokenContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const tokenResp = await JoblyApi.login(formData);

    if (tokenResp.status === 401) setErrors(() => ['Invalid Credentials']);
    else {
      const userResp = await JoblyApi.getProfile(formData.username, {
        _token: tokenResp.token,
      });
      history.push('/');
      setUserData({ ...tokenResp, ...userResp });
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(formData => ({
      ...formData,
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
          value={formData.username}
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
          value={formData.password}
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
