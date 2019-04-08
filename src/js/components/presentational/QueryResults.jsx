import React from 'react';
import PropTypes from 'prop-types';

function printResults(snapshot, propertyFilter = '') {
  if (snapshot) {
    if (!snapshot.exists()) {
      return <div>Not found</div>;
    }
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
          <li key={child.key}>
            {display}
            {grandchildren}
          </li>
        );
      }

      return null;
    });

    return (
      <ul>
        {childrenList}
      </ul>
    );
  }

  return null;
}

// eslint-disable-next-line react/prop-types
const QueryResults = ({ fetchedData, propertyFilter }) => (
  <section>
    {printResults(fetchedData, propertyFilter)}
  </section>
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

export default QueryResults;
