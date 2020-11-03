import { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TokenContext from '../../utils/tokenContext';
import JoblyApi from '../../utils/JoblyApi';
import SearchBar from '../SearchBar/SearchBar';
import Company from '../Company/Company';

const CompaniesList = () => {
  const { userData } = useContext(TokenContext);
  const [queryParams, setQueryParams] = useState({
    search: '',
    _token: userData.token,
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      queryParams._token = userData.token;
      const resp = await JoblyApi.getCompanies(queryParams);

      setCompanies(() => resp);
    };
    getCompanies();
  }, [queryParams, userData.token]);

  if (!userData.token) return <Redirect to="/login" />;

  return (
    <div className="CompanyList pt-5">
      <SearchBar setQueryParams={setQueryParams} />
      {companies.map(c => (
        <Company data={c} key={c.name} />
      ))}
    </div>
  );
};

export default CompaniesList;
