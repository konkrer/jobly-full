import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import JoblyApi from '../../utils/JoblyApi';
import TokenContext from '../../utils/tokenContext';
import './Profile.css';

const Profile = () => {
  const { userData, setUserData } = useContext(TokenContext);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    photo_url: '',
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const params = { _token: userData.token };

      // error handling???
      const userResp = await JoblyApi.getProfile(userData.username, params);

      delete userResp.jobs;
      // if photo_url is null change to empty string
      userResp.photo_url = userResp.photo_url ? userResp.photo_url : '';

      setFormData(formData => ({ ...formData, ...userResp }));
    };
    getUserProfile();
  }, [userData]);

  // if user not logged in go to login
  if (!userData.token) return <Redirect to="/login" />;

  const handleChange = e => {
    const { name, value } = e.target;

    setFeedback(null);

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = { ...formData };

    data._token = userData.token;
    delete data.username;
    if (!data.photo_url) data.photo_url = '';

    const userResp = await JoblyApi.updateProfile(formData.username, data);

    if (userResp.data?.error) {
      setErrors(() =>
        userResp.data.message
          ? [userResp.data.message]
          : Array.isArray(userResp.data.error.message)
          ? userResp.data.error.message
          : [userResp.data.error.message]
      );
      setFeedback(null);
    } else {
      setFeedback(() => 'Profile Updated');
      setErrors([]);
      setUserData({ ...userData, ...userResp.user });
    }
  };

  return (
    <div className="Profile row text-left">
      <div className="Profile-col pt-5 col-6 mx-auto">
        <h3 className="Profile-title">Profile</h3>
        <Form className="card-style2 rounded" onSubmit={handleSubmit}>
          <FormGroup onSubmit={handleSubmit}>
            <Label for="username">Username</Label>
            <Input plaintext readOnly value={formData.username} />
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
          <FormGroup>
            <Label for="photo_url">Photo URL</Label>
            <Input
              type="text"
              name="photo_url"
              id="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Re-enter Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
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
