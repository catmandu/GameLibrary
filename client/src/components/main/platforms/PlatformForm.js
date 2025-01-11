import React, { useState, useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../layout/Title';
import TextBox from '../../layout/TextBox';
import SubmitButton from '../../layout/SubmitButton';
import PlatformContext from '../../../context/main/platform/platformContext';
import AlertContext from '../../../context/alert/alertContext';
import ConfirmContext from '../../../context/confirm/confirmContext';
import UserContext from '../../../context/main/user/userContext';
import useRefreshToken from '../../../hooks/useRefreshToken';

const PlatformForm = () => {
  const {
    AddPlatform,
    UpdatePlatform,
    RemovePlatform,
    GetPlatforms,
    current,
    platforms,
  } = useContext(PlatformContext);

  const { user, GetUser } = useContext(UserContext);
  const { SetAlert } = useContext(AlertContext);
  const { SetConfirm, RemoveConfirm } = useContext(ConfirmContext);
  const [platform, SetPlatform] = useState(current || { name: '' });
  const [deleteSelected, SetOperation] = useState(false);
  const navigate = useNavigate();
  const { name } = platform;

  useRefreshToken();

  useLayoutEffect(() => {
    GetUser();
    console.log(user);
  }, []);
  const OnSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      SetAlert('Please set a name for the new gaming platform', 'danger');
    } else {
      const actionTitle =
        current === null ? 'Add' : deleteSelected ? 'Delete' : 'Update';
      SetConfirm(
        `${actionTitle} platform`,
        `Are you sure you want to ${actionTitle.toLocaleLowerCase()} the current platform?`,
        async () => {
          const Action =
            current === null
              ? AddPlatform
              : deleteSelected
              ? RemovePlatform
              : UpdatePlatform;
          await Action(platform);
          platforms.length === 0 && (await GetPlatforms());
          RemoveConfirm();
          SetAlert(`${actionTitle} successful`, 'success');
          navigate('/availablePlatforms');
        }
      );
    }
  };

  return (
    <form onSubmit={OnSubmit}>
      <Title
        title='Gaming Platform'
        currentState={current}
        deleteState={deleteSelected}
        SetOperation={SetOperation}
      />
      <TextBox
        name='name'
        state={platform}
        placeholder="Enter platform's name"
        deleteState={deleteSelected}
        SetState={SetPlatform}
        type='text'
      />
      <SubmitButton
        title='Platform'
        currentState={current}
        deleteState={deleteSelected}
      />
    </form>
  );
};

export default PlatformForm;
