import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../layout/Title';
import TextBox from '../../layout/TextBox';
import SubmitButton from '../../layout/SubmitButton';
import PublisherContext from '../../../context/main/publisher/publisherContext';
import AlertContext from '../../../context/alert/alertContext';
import ConfirmContext from '../../../context/confirm/confirmContext';
import useRefreshToken from '../../../hooks/useRefreshToken';

const PublisherForm = () => {
  const {
    AddPublisher,
    UpdatePublisher,
    RemovePublisher,
    GetPublishers,
    current,
    publishers,
  } = useContext(PublisherContext);
  const { SetAlert } = useContext(AlertContext);
  const { SetConfirm, RemoveConfirm } = useContext(ConfirmContext);
  const [publisher, SetPublisher] = useState(current || { name: '' });
  const [deleteSelected, SetOperation] = useState(false);
  const navigate = useNavigate();
  const { name } = publisher;

  useRefreshToken();

  const OnSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      SetAlert('Please set a name for the new publisher', 'danger');
    } else {
      const actionTitle =
        current === null ? 'Add' : deleteSelected ? 'Delete' : 'Update';
      SetConfirm(
        `${actionTitle} publisher`,
        `Are you sure you want to ${actionTitle.toLocaleLowerCase()} the current publisher?`,
        async () => {
          const Action =
            current === null
              ? AddPublisher
              : deleteSelected
              ? RemovePublisher
              : UpdatePublisher;
          await Action(publisher);
          publishers.length === 0 && (await GetPublishers());
          SetAlert(`${actionTitle} successful`, 'success');
          RemoveConfirm();
          navigate('/availablePublishers');
        }
      );
    }
  };

  return (
    <form onSubmit={OnSubmit}>
      <Title
        title='Publisher'
        currentState={current}
        deleteState={deleteSelected}
        SetOperation={SetOperation}
      />
      <TextBox
        name='name'
        state={publisher}
        placeholder="Enter publisher's name"
        deleteState={deleteSelected}
        SetState={SetPublisher}
        type='text'
      />
      <SubmitButton
        title='Publisher'
        currentState={current}
        deleteState={deleteSelected}
      />
    </form>
  );
};

export default PublisherForm;
