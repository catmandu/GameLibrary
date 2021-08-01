import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PlatformContext from '../../../context/main/platform/platformContext';
import PropTypes from 'prop-types';

const PlatformItem = ({ platform }) => 
{
  const { SetCurrentPlatform } = useContext(PlatformContext);
  const { name } = platform;
  
  return (
    <Link to='/platform' style={{color:'inherit'}} onClick={() => { SetCurrentPlatform(platform); }}>
      <div className='card text-center'>
        <span className='text-label'>{name}</span>
      </div>
    </Link>    
  );
};

PlatformItem.propTypes = 
{
    platform: PropTypes.object.isRequired
};

export default PlatformItem;
