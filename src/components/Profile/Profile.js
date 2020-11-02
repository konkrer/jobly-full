import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import JoblyApi from '../../utils/JoblyApi';
import TokenContext from '../../utils/tokenContext';
import jwt from 'jsonwebtoken';
import './Profile.css';

const Profile = () => {
  const { token } = useContext(TokenContext);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState([]);

  const [user, setUser] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    photo_url: '',
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const params = { _token: token };
      const username = jwt.decode(token).username;

      const resp = await JoblyApi.getProfile(username, params);

      // change null to empty string
      resp.photo_url = resp.photo_url ? resp.photo_url : '';

      setUser(user => ({ ...user, ...resp }));
    };
    getUserProfile();
  }, [token]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFeedback(null);

    setUser(user => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = { ...user };

    data._token = token;
    delete data.jobs;
    delete data.username;
    if (!data.photo_url) delete data.photo_url;

    const resp = await JoblyApi.updateProfile(user.username, data);

    if (resp.data?.error) {
      setErrors(() =>
        resp.data.message
          ? [resp.data.message]
          : Array.isArray(resp.data.error.message)
          ? resp.data.error.message
          : [resp.data.error.message]
      );
      setFeedback(null);
    } else {
      setFeedback(() => 'Profile Updated');
      setErrors([]);
    }
  };

  if (!token) return <Redirect to="/" />;

  return (
    <div className="Profile row text-left">
      <div className="Profile-col pt-5 col-6 mx-auto">
        <h3 className="Profile-title">Profile</h3>
        <Form className="card-style2 rounded" onSubmit={handleSubmit}>
          <FormGroup onSubmit={handleSubmit}>
            <Label for="username">Username</Label>
            <Input plaintext readOnly value={user.username} />
          </FormGroup>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              value={user.first_name}
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
              value={user.last_name}
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
              value={user.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo_url">Photo URL</Label>
            <Input
              type="text"
              name="photo_url"
              id="photo_url"
              value={user.photo_url}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Re-enter Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {errors.map((e, i) => (
            <Alert color="danger" key={i}>
              {e}
            </Alert>
          ))}
          {feedback && <Alert color="success">{feedback}</Alert>}
          <Button color="primary" className="form-control">
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
