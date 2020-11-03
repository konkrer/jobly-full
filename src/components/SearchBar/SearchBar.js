import { useState } from 'react';

const SearchBar = ({ setQueryParams }) => {
  const [formData, setFormData] = useState({ search: '' });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setQueryParams(() => formData);
  };

  return (
    <form className="SearchBar mb-4" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={formData.search}
          onChange={handleChange}
          name="search"
          placeholder="Enter search term..."
          className="form-control form-control-lg"
        />
        <div className="input-group-append">
          <button className="btn btn-primary btn-lg">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
