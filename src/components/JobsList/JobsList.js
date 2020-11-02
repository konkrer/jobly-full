import { useContext, useState, useEffect } from 'react';
import TokenContext from '../../utils/tokenContext';
import JoblyApi from '../../utils/JoblyApi';
import SearchBar from '../SearchBar/SearchBar';
import Job from '../Job/Job';

const JobsList = () => {
  const { token } = useContext(TokenContext);
  const [queryParams, setQueryParams] = useState({
    search: '',
    _token: token,
  });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const resp = await JoblyApi.getJobs(queryParams);

      setJobs(() => resp);
    };
    getJobs();
  }, [queryParams]);

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
