import React from 'react';
import PropTypes from 'prop-types';

const DropDownList = ({title, name, list, state, SetState, deleteState}) =>
{
    const OnChange = e =>
    {
      const { value } = e.target;
      SetState({...state, [name]:value});
    };

    return (
        <div className ='container'>
            <h3 className="text-primary">{title}</h3>
            <select disabled={deleteState} name={name} value={state[name]} onChange={OnChange}>
                <option value=''>Select one</option>
                {list.map(item =>(<option key={item._id} value={item._id}>{item.name}</option>))}
            </select>
        </div>
    );
};

DropDownList.propTypes = 
{
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    SetState: PropTypes.func.isRequired,
    deleteState: PropTypes.bool.isRequired
};

export default DropDownList;