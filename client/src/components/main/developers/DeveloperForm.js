import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../layout/Title';
import SubmitButton from '../../layout/SubmitButton';
import TextBox from '../../layout/TextBox';
import DeveloperContext from '../../../context/main/developer/developerContext';
import AlertContext from '../../../context/alert/alertContext';
import ConfirmContext from '../../../context/confirm/confirmContext';

const DeveloperForm = () =>
{    
    const { AddDeveloper, UpdateDeveloper, RemoveDeveloper, GetDevelopers, current, developers } = useContext(DeveloperContext);
    const { SetAlert } = useContext(AlertContext);
    const { SetConfirm, RemoveConfirm } = useContext(ConfirmContext);
    const [developer, SetDeveloper] = useState(current || {name:''});
    const [deleteSelected, SetOperation] = useState(false);
    const history = useHistory();
    const { name } = developer;

    const OnSubmit = e =>
    {
        e.preventDefault();
        if(name === '')
        {
            SetAlert('Please set a name for the developer', 'danger');
        }
        else
        {
            const actionTitle = current === null ? 'Add' : deleteSelected ? 'Delete' : 'Update';
            SetConfirm(`${actionTitle} Developer`, `Are you sure you want to ${actionTitle.toLocaleLowerCase()} the current developer?`, async () =>
            {
                const Action = current === null ? AddDeveloper : deleteSelected ? RemoveDeveloper : UpdateDeveloper;                
                await Action(developer);
                developers.length === 0 && await GetDevelopers();
                RemoveConfirm();
                SetAlert(`${actionTitle} successful`, 'success');
                history.push('/availableDevelopers');
            });
        }
    };

    return <form onSubmit={OnSubmit}>
                <Title title='Developer' currentState={current} deleteState={deleteSelected} SetOperation={SetOperation} />
                <TextBox
                    name='name'
                    state={developer}
                    placeholder="Enter developer's name"
                    deleteState={deleteSelected}
                    SetState={SetDeveloper} />
                <SubmitButton title='Developer' currentState={current} deleteState={deleteSelected}/>
            </form>;
};


export default DeveloperForm;