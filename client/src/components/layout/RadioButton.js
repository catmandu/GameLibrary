import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({title, name, value, state, SetState, deleteState}) =>
{
    const OnChange = e =>
    {
        const { value } = e.target;
        SetState({...state, [name]:value === 'true'});
    };
    
    return  <div className='container'>
                <h3 className='text-primary'>{title}</h3>
                <input disabled={deleteState} id={`${name}No`} type='radio' name={name} value='false' checked={!value} onChange={OnChange}/>
                <label htmlFor={`${name}No`}>No</label>
                &nbsp;
                <input disabled={deleteState} id={`${name}Yes`} type='radio' name={name} value='true' checked={value} onChange={OnChange}/>
                <label htmlFor={`${name}Yes`}>Yes</label>
            </div>;
};

RadioButton.propTypes =
{
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
    SetState: PropTypes.func.isRequired,
    deleteState: PropTypes.bool.isRequired
};

export default RadioButton;