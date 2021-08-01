import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PublisherContext from '../../../context/main/publisher/publisherContext';
import PropTypes from 'prop-types';

const PublisherItem = ({ publisher }) => 
{
  const { SetCurrentPublisher } = useContext(PublisherContext);
  const { name } = publisher;
  
  return (
    <Link to='/publisher' style={{color:'inherit'}} onClick={() => { SetCurrentPublisher(publisher); }}>
      <div className='card text-center'>
        <span className='text-label'>{name}</span>
      </div>
    </Link>    
  );
};

PublisherItem.propTypes = 
{
  publisher: PropTypes.object.isRequired
};

export default PublisherItem;
