import React from 'react';
import PropTypes from 'prop-types';

const Title = ({title, currentState, deleteState, SetOperation}) =>
{

    const OnClick = () =>
    {
        SetOperation(!deleteState);
    };

    return(
        <>
        <h2 className='text-primary'>{`${currentState === null? 'Add' :  deleteState ? 'Delete' : 'Update'} ${title}`}</h2>
            {currentState !== null && 
                (<i className={`text-primary far ${deleteState ? 'far fa-edit': 'fa-trash-alt'} fa-lg delete-update-icon`} 
                onClick={() => OnClick()} />)}
        </>
    );
};

Title.prototypes =
{
    title: PropTypes.string.isRequired,
    currentState: PropTypes.object.isRequired,
    deleteState: PropTypes.bool.isRequired,
    SetOperation: PropTypes.func.isRequired
};

export default Title;
