import React from 'react';
import PropTypes from 'prop-types';


const QueryBreadcrumbs = ({ queries, handleClick }) => (
  <div>
    {queries.map((query, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <span onClick={handleClick} id={index} key={index}>{`${query}>`}</span>
    ))}
  </div>
);

QueryBreadcrumbs.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QueryBreadcrumbs;
