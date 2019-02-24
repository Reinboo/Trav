import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const QueryBreadcrumbs = ({ queries, handleClick }) => (
  <div>
    {queries.map((query, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Breadcrumb onClick={handleClick} id={index} key={index}>
        {`${query}`}
      </Breadcrumb>
    ))}
  </div>
);

QueryBreadcrumbs.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Breadcrumb = styled.button`
  position: relative;
  background: none;
  border: none;
  margin-right: 1rem;
  padding: 0;
  text-decoration: underline;
  
  &:hover {
    color: #00695c;
    cursor: pointer;
  }
  
  &::after {
    content: '>';
    position: absolute;
    left: calc( 100% + .25rem );
  }
`;

export default QueryBreadcrumbs;
