import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import JoblyApi from '../../utils/JoblyApi';
import TokenContext from '../../utils/tokenContext';

const SignupForm = () => {
  const history = useHistory();
  const { setUserData } = useContext(TokenContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const tokenResp = await JoblyApi.addProfile(formData);

    if (tokenResp.data?.error) {
      setErrors(() => tokenResp.data.error.message);
    } else {
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
      <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input
          type="text"
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="last_name">Last Name</Label>
        <Input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="text"
          name="email"
          id="email"
          value={formData.email}
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
      <Button color="primary" className="form-control">
        Save Changes
      </Button>
    </Form>
  );
};

export default SignupForm;
