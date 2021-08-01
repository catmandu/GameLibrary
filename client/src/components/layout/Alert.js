import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => 
{
  const { alert, RemoveAlert } = useContext(AlertContext);

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
        <i className="far bg fa-times-circle fa-md close-icon" onClick={() => RemoveAlert()}/>
      </div>
    )
  );
};

export default Alert;
