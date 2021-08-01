import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({title, currentState, deleteState}) =>
{
     
    return  <div className='container' >
                <button type='submit' className='btn btn-primary btn-block'>
                    {`${currentState === null ? 'Add' : deleteState ? 'Delete' : 'Update'} ${title}`}
                </button>
            </div>;
};

SubmitButton.propTypes = 
{
  title: PropTypes.string.isRequired,
  currentState: PropTypes.object,
  deleteState: PropTypes.bool.isRequired
};

export default SubmitButton;