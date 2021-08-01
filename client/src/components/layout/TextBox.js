import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({type, title, placeholder, name, state, SetState, deleteState}) =>
{
    const OnChange = e =>
    {
        const { value } = e.target;
        SetState({...state, [name]:value});
    };

    return <div className='container'>            
                <h3 className="text-primary">{title}</h3>
                <input disabled={deleteState} type={type} name={name} onChange={OnChange} value={state[name]} placeholder={placeholder}/>
            </div>;
};

TextBox.defaultProps =
{
    deleteState: false,
    placeholder: 'Enter item',
    type: 'text',
    title: ''
};

TextBox.propTypes =
{
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    SetState: PropTypes.func.isRequired,
    deleteState: PropTypes.bool.isRequired
};

export default TextBox;