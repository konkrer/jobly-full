import { useContext, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import TokenContext from '../../utils/tokenContext';
import JoblyApi from '../../utils/JoblyApi';
import Job from '../Job/Job';
import './CompanyDetail.css';

const CompanyDetail = () => {
  const { userData } = useContext(TokenContext);
  const { handle } = useParams();
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      const params = { _token: userData.token };

      const resp = await JoblyApi.getCompany(handle, params);

      if (resp.data?.error) return setCompanyData(false);

      setCompanyData(() => resp.company);
    };
    getCompany();
  }, [handle, userData]);

  // if api call happened and no data was found to to companies.
  if (companyData === false) return <Redirect to="/companies" />;

  return companyData ? (
    <div className="CompanyDetail pt-5 text-left">
      <h4>{companyData.name}</h4>
      <p>{companyData.description}</p>
      {companyData.jobs.map(j => (
        <Job data={j} key={j.id} />
      ))}
    </div>
  ) : (
    'Loading...'
  );
};

export default CompanyDetail;
