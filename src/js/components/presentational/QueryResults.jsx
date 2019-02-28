import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function printResults(snapshot, propertyFilter = '') {
  if (snapshot) {
    const snapshotChildren = [];

    // Add snapshot children to an array
    if (snapshot.hasChildren()) {
      snapshot.forEach((child) => {
        snapshotChildren.push(child);
      });
    }

    const childrenList = snapshotChildren.map((child) => {
      let grandchildren;

      if (child.hasChildren()) {
        grandchildren = printResults(child);
      }

      const isFiltered = (propertyFilter !== '')
        ? !child.hasChild(propertyFilter)
        : false;

      let display = null;

      if (!isFiltered) {
        display = child.hasChildren()
          ? (
            <span>
              {child.key}
            </span>
          )
          : (
            <span>
              {`${child.key}: ${child.val()}`}
            </span>
          );
      }

      if (display) {
        return (
          <ListItem key={child.key}>
            {display}
            {grandchildren}
          </ListItem>
        );
      }

      return null;
    });

    return (
      <List>
        {childrenList}
      </List>
    );
  }

  return null;
}

// eslint-disable-next-line react/prop-types
const QueryResults = ({ fetchedData, propertyFilter }) => (
  <Wrapper>
    {printResults(fetchedData, propertyFilter)}
  </Wrapper>
);

QueryResults.propTypes = {
  fetchedData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      val: PropTypes.func.isRequired,
      hasChild: PropTypes.func.isRequired,
      hasChildren: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  propertyFilter: PropTypes.string,
};

QueryResults.defaultProps = {
  propertyFilter: '',
};

const Wrapper = styled.section`
  border-top: 1px solid lightgrey;
`;

const List = styled.ul`
  position: relative;
  padding-left: 3ch;
  margin: 2px 0;
  margin-left: 1ch;
  list-style-type: none;
  border-left: 1px solid #9e9e9e;
    
  &::before {
    content: '●—';
    position: absolute;
    left: -.65ch;
    color: #9e9e9e;
  }
`;

const ListItem = styled.li`
  position: relative;
  
  &:not(:first-child)::before {
    content: '●—';
    position: absolute;
    left: -3.65ch;
    color: #9e9e9e;
  }
`;

export default QueryResults;
