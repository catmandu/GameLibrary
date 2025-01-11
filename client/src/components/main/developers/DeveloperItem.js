import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeveloperContext from '../../../context/main/developer/developerContext';
import PropTypes from 'prop-types';
import useRefreshToken from '../../../hooks/useRefreshToken';

const DeveloperItem = ({ developer }) => {
  const { SetCurrentDeveloper } = useContext(DeveloperContext);
  const { name } = developer;

  useRefreshToken();

  return (
    <Link
      to='/developer'
      style={{ color: 'inherit' }}
      onClick={() => {
        SetCurrentDeveloper(developer);
      }}
    >
      <div className='card text-center'>
        <span className='text-label'>{name}</span>
      </div>
    </Link>
  );
};

DeveloperItem.propTypes = {
  developer: PropTypes.object.isRequired,
};

export default DeveloperItem;
