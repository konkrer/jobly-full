import { Card, CardBody } from 'reactstrap';

const Job = ({ data }) => {
  return (
    <Card className="Job card-style1">
      <CardBody>
        <h6>{data.title}</h6>
        <div>Salary: {data.salary}</div>
        <div>Equity: {data.equity}</div>
        <div className="text-right">
          <button
            className="btn btn-danger font-weight-bold"
            onClick={() => alert('TODO: Make apply functionality!')}
          >
            APPLY
          </button>
        </div>
      </CardBody>
    </Card>
  );
};
export default Job;
