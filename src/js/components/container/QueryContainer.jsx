import React, { Component } from 'react';
import * as Firebase from 'firebase/app';
import 'firebase/database';
import styled from 'styled-components';
import QueryForm from '../presentational/QueryForm';
import QueryResults from '../presentational/QueryResults';
import QueryBreadcrumbs from '../presentational/QueryBreadcrumbs';

class QueryContainer extends Component {
  constructor() {
    super();

    this.state = {
      currentQuery: [''],
      activeQueryText: '',
      // eslint-disable-next-line react/no-unused-state
      showNextQueryInput: false,
      fullQuery: [],
      currentNestLevel: 0,
      totalNestLevel: 0,
      fetchedData: false,
      propertyFilter: '',
    };

    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangePropertyFilter = this.handleChangePropertyFilter.bind(this);
    this.appendQuery = this.appendQuery.bind(this);
    this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
    this.handleResetQuery = this.handleResetQuery.bind(this);
    this.submitBreadcrumbQuery = this.submitBreadcrumbQuery.bind(this);
  }

  handleChangeQuery(event) {
    event.persist();

    const queryValue = event.target.value;
    const queryIndex = Number(event.target.dataset.index);

    this.setState((prevState) => {
      const { currentQuery, showNextQueryInput, currentNestLevel } = prevState;

      // Check if an unlocked query is being edited
      if (currentNestLevel > queryIndex) {
        currentQuery[queryIndex] = queryValue;
        return ({
          currentQuery,
        });
      }

      // Create the +1 query input for ease of use
      if (!showNextQueryInput && (currentNestLevel < 9) && (queryValue !== '')) {
        currentQuery.push('');
      } else if ((queryValue === '') && (currentQuery.length - 1 > currentNestLevel)) {
        currentQuery.pop('');
      }

      return ({
        activeQueryText: queryValue,
        showNextQueryInput: !(queryValue === ''),
      });
    });
  }

  appendQuery(event) {
    event.persist();

    const activeQueryText = event.target.value;
    const queryIndex = Number(event.target.dataset.index);

    if (activeQueryText !== '') {
      this.setState((prevState) => {
        let { currentNestLevel } = prevState;

        if (currentNestLevel < 10) {
          const { currentQuery } = prevState;
          const showNextQueryInput = false;

          if (queryIndex === currentNestLevel) { // Exclude edited(unlocked) queries
            currentQuery[currentNestLevel] = activeQueryText;
            currentNestLevel += 1;
          } else { // Lock query after editing
            event.target.classList.add('locked');
            document.getElementById(`label${queryIndex}`).classList.add('locked');
          }

          return ({
            currentQuery,
            currentNestLevel,
            showNextQueryInput,
            activeQueryText: '',
          });
        }

        // If we already have 10 input fields, leave state unchanged
        return ({});
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  unlockQuery(event) {
    event.persist();
    event.target.classList.remove('locked');
    document.getElementById(event.target.htmlFor).classList.remove('locked');
  }

  handleResetQuery() {
    this.setState({
      fetchedData: null,
      fullQuery: [],
      currentQuery: [''],
      currentNestLevel: 0,
      totalNestLevel: 0,
      showNextQueryInput: false,
    });
  }

  handleSubmitQuery(event) {
    const { currentQuery, currentNestLevel } = this.state;
    let { totalNestLevel, fullQuery } = this.state;
    const focusedInput = document.activeElement;

    // Add to the total nest level before current gets reset
    totalNestLevel += currentNestLevel;

    const hangingQueryId = `query${currentNestLevel}`;

    // Pick up the hanging query input
    if (focusedInput.id === hangingQueryId && focusedInput.value !== '') {
      currentQuery[currentNestLevel] = focusedInput.value;
    }

    if (currentQuery[currentQuery.length - 1] === '') {
      currentQuery.pop();
    }
    fullQuery = fullQuery.concat(currentQuery);

    const jointQuery = fullQuery.join('/');

    Firebase.database()
      .ref(jointQuery)
      .once('value')
      .then((snapshot) => {
        this.setState({
          fetchedData: snapshot,
        });
      });

    this.setState({
      fullQuery,
      currentQuery: [''],
      currentNestLevel: 0,
      totalNestLevel,
      showNextQueryInput: false,
    });

    // Prevent reload
    event.preventDefault();
  }

  submitBreadcrumbQuery(event) {
    let { fullQuery } = this.state;
    const index = Number(event.target.id); // New nest level

    fullQuery = fullQuery.slice(0, index + 1); // slice() doesn't include last item

    const jointQuery = fullQuery.join('/');

    Firebase.database()
      .ref(jointQuery)
      .once('value')
      .then((snapshot) => {
        this.setState({
          fetchedData: snapshot,
        });
      });

    this.setState({
      totalNestLevel: index,
      fullQuery,
      currentQuery: [''],
      currentNestLevel: 0,
      showNextQueryInput: false,
    });
  }

  handleChangePropertyFilter(event) {
    const property = event.target.value;

    this.setState({
      propertyFilter: property,
    });
  }

  render() {
    const {
      fullQuery,
      currentQuery,
      currentNestLevel,
      propertyFilter,
      activeQueryText,
      fetchedData,
    } = this.state;
    const lastQueryIndex = currentQuery.length - 1;

    return (
      <Wrapper>
        <QueryForm
          currentQuery={currentQuery}
          currentNestLevel={currentNestLevel}
          activeQueryText={activeQueryText}
          lastQueryIndex={lastQueryIndex}
          propertyFilter={propertyFilter}
          handleSubmitQuery={this.handleSubmitQuery}
          handleResetQuery={this.handleResetQuery}
          handleChangeQuery={this.handleChangeQuery}
          handleChangePropertyFilter={this.handleChangePropertyFilter}
          appendQuery={this.appendQuery}
          unlockQuery={this.unlockQuery}
        />
        <QueryBreadcrumbs queries={fullQuery} handleClick={this.submitBreadcrumbQuery} />
        <QueryResults fetchedData={fetchedData} propertyFilter={propertyFilter} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  
  * {
    box-sizing: border-box;
  }
`;

export default QueryContainer;
