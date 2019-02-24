import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const QueryInput = (
  {
    text,
    type,
    id,
    index,
    className,
    value,
    autofocus,
    handleChange,
    appendQuery,
    unlockQuery,
  },
) => (
  <div>
    <Label className={className} id={`label${index}`} onClick={unlockQuery} htmlFor={id}>{text}</Label>
    <Input
      type={type}
      id={id}
      data-index={index}
      className={className}
      value={value}
      autoFocus={autofocus}
      onChange={handleChange}
      onBlur={appendQuery}
      list="test"
    />
  </div>
);

QueryInput.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autofocus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  appendQuery: PropTypes.func.isRequired,
  unlockQuery: PropTypes.func.isRequired,
};

const Input = styled.input`
  color: #2b2b2b;
  max-width: 8vw;

  &.locked {
    display: none;
  }
`;

const Label = styled.label`
  position: relative;
  display: none;
  color: #263238;
  height: 100%;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  &.locked {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.locked::after {
    content: '>';
    position: absolute;
    left: 100%;
  }

`;

export default QueryInput;
