import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import QueryInput from './QueryInput';

const QueryForm = (
  {
    currentQuery,
    propertyFilter,
    currentNestLevel,
    activeQueryText,
    lastQueryIndex,
    handleSubmitQuery,
    handleResetQuery,
    handleChangePropertyFilter,
    handleChangeQuery,
    appendQuery,
    unlockQuery,
  },
) => (
  <form onSubmit={handleSubmitQuery}>
    <Wrapper>
      {currentQuery.map((value, index) => (
        <QueryInput
          // There is no re-arrangement/sorting of currentQuery, so index is safe //
          // eslint-disable-next-line react/no-array-index-key
          key={`queryKey${index}`}
          text={value}
          label={value}
          type="text"
          id={`query${index}`}
          index={index}

          // Locks all lower level, non-empty, queries
          className={((currentNestLevel > index) && (value !== '')) ? 'locked' : ''}

          // Use activeQueryText value only for last input
          value={
            (lastQueryIndex === index) || (currentNestLevel > index) ? value : activeQueryText
          }

          // Set focus on last input
          autofocus={(currentNestLevel === index) ? 'autofocus' : ''}

          handleChange={handleChangeQuery}
          appendQuery={appendQuery}
          unlockQuery={unlockQuery}
        />
      ))}
    </Wrapper>
    <input type="submit" value="Fetch" />
    <input type="button" value="Reset" onClick={handleResetQuery} />
    <input type="text" value={propertyFilter} placeholder="Child property..." onChange={handleChangePropertyFilter} />
  </form>
);

QueryForm.propTypes = {
  currentQuery: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentNestLevel: PropTypes.number.isRequired,
  activeQueryText: PropTypes.string.isRequired,
  propertyFilter: PropTypes.string.isRequired,
  lastQueryIndex: PropTypes.number.isRequired,
  handleSubmitQuery: PropTypes.func.isRequired,
  handleChangeQuery: PropTypes.func.isRequired,
  handleResetQuery: PropTypes.func.isRequired,
  handleChangePropertyFilter: PropTypes.func.isRequired,
  appendQuery: PropTypes.func.isRequired,
  unlockQuery: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-columns: minmax(auto, calc( 10vw - 1rem ));
  grid-column-gap: 1rem;

  * {
    grid-row: 1/2;
  }
`;

export default QueryForm;
