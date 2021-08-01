import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Search = ({Filter, placeholder}) => 
{
  const [text, SetText] = useState('');

  useEffect(() =>
  {
    Filter(text);
    // eslint-disable-next-line
  }, []);

  const OnChange = e => 
  {
    const { value } = e.target;

    Filter(value);
    SetText(value);
  };

  return (
    <>
        <input
          type='text'
          name='text'
          placeholder={`${placeholder}...`}
          value={text}
          onChange={OnChange}
        />
    </>
  );
};

Search.defaultProps =
{
  placeholder:'Filter'
};

Search.propTypes =
{
  Filter: PropTypes.func.isRequired
};

export default Search;
