import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Company.css';

const Company = ({ data }) => {
  return (
    <Link to={`/companies/${data.handle}`} className="minimal-link">
      <Card className="Company card-style1 hover-shadow">
        <CardBody>
          <h6>
            {data.name}
            <span className="float-right">
              {
                <img
                  src={data.logo_url}
                  className="Company-img"
                  alt="Company Logo Icon"
                />
              }
            </span>
          </h6>
          <p className="mt-5">{data.description}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default Company;
