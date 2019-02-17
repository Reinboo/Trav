import React from 'react';
// import firebase from 'firebase';
// import Database 'firebase/database';
import PropTypes from 'prop-types';

function printResults(snapshot) {
  if (snapshot) {
    const snapshotChildren = [];

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

      const display = child.hasChildren()
        ? (
          <div>
            {child.key}
          </div>
        )
        : (
          <div>
            {`${child.key}: ${child.val()}`}
          </div>
        );

      return (
        <li key={child.key}>
          {display}
          {grandchildren}
        </li>
      );
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
const QueryResults = ({ fetchedData }) => (
  <section>
    {printResults(fetchedData)}
  </section>
);

QueryResults.propTypes = {
  // fetchedData: PropTypes.node.isRequired,
};

export default QueryResults;
