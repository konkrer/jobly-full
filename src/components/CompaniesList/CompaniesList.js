import { useContext, useState, useEffect } from 'react';
import TokenContext from '../../utils/tokenContext';
import JoblyApi from '../../utils/JoblyApi';
import SearchBar from '../SearchBar/SearchBar';
import Company from '../Company/Company';

const CompaniesList = () => {
  const { token } = useContext(TokenContext);
  const [queryParams, setQueryParams] = useState({
    search: '',
    _token: token,
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const resp = await JoblyApi.getCompanies(queryParams);

      setCompanies(() => resp);
    };
    getCompanies();
  }, [queryParams]);

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
