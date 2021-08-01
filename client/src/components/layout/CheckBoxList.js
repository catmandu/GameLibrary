import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxList = ({title, name, list, state, SetState, deleteState}) =>
{
    const OnChange = e =>
    {
        const { checked, value } = e.target;
        const { [name]: propsArray } = state;

        if(checked)
        {
            propsArray.push(value);
        }
        else
        {
            const index = propsArray.indexOf(value);

            if(index >= 0)
            {
                propsArray.splice(index, 1);
            }
        }

        SetState({...state, [name]:propsArray});
    };

    const checkBoxStyle = 
    {
      marginRight:'2rem',
      width:'20%',
      display:'inline-block',
      float:'left'
    };

    return (
        <>
            <div className='container'>
                <h3 className="text-primary">{title}</h3>
                <ul>
                {list.map(item =>
                {
                    return <li key={item._id} style={checkBoxStyle}>
                                <label>
                                    <input disabled={deleteState} type='checkbox' name={name} checked={state[name].includes(item._id)} onChange={OnChange} value={item._id}/>
                                    {item.name}
                                </label>
                            </li>;
                })}
                </ul>
            </div>
            <br/>
        </>
    );
};

CheckBoxList.propTypes =
{
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    SetState: PropTypes.func.isRequired,
    deleteState: PropTypes.bool.isRequired
};

export default CheckBoxList;