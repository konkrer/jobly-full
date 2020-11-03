import { useContext, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import TokenContext from '../../utils/tokenContext';
import JoblyApi from '../../utils/JoblyApi';

const Job = ({ data }) => {
  const { userData, setUserData } = useContext(TokenContext);

  const [application, setApplication] = useState(
    userData.jobs.find(j => j.id === data.id)
  );

  const handleApply = async () => {
    const resp = await JoblyApi.applyJob(data.id, {
      _token: userData.token,
    });

    const application = {
      id: data.id,
      title: data.title,
      company_handle: data.company_handle,
      state: resp.message,
    };

    setApplication(() => application);
    setUserData({
      ...userData,
      jobs: [...userData.jobs, application],
    });
  };

  const btnText = application ? 'Remove Application' : 'Apply';

  return (
    <Card className="Job card-style1">
      <CardBody>
        <h6>{data.title}</h6>
        <div>Salary: {data.salary}</div>
        <div>Equity: {data.equity}</div>
        <div className="text-right">
          <button
            className="btn btn-danger font-weight-bold"
            onClick={
              btnText === 'Apply'
                ? handleApply
                : () => alert('you cannot un-apply. bwahahahaha!')
            }
          >
            {btnText}
          </button>
        </div>
      </CardBody>
    </Card>
  );
};
export default Job;
