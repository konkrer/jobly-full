import { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TokenContext from '../../utils/tokenContext';
import JoblyApi from '../../utils/JoblyApi';
import SearchBar from '../SearchBar/SearchBar';
import Job from '../Job/Job';

const JobsList = () => {
  const { userData } = useContext(TokenContext);
  const [queryParams, setQueryParams] = useState({
    search: '',
    _token: userData.token,
  });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      queryParams._token = userData.token;
      const resp = await JoblyApi.getJobs(queryParams);

      setJobs(() => resp);
    };
    getJobs();
  }, [queryParams, userData.token]);

  if (!userData.token) return <Redirect to="/login" />;

  return (
    <div className="JobsList pt-5">
      <SearchBar setQueryParams={setQueryParams} />
      {jobs.map(j => (
        <Job data={j} key={j.id} />
      ))}
    </div>
  );
};

export default JobsList;
