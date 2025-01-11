import React, { useState, useContext } from 'react';
import Title from '../../layout/Title';
import TextBox from '../../layout/TextBox';
import SubmitButton from '../../layout/SubmitButton';
import UserContext from '../../../context/main/user/userContext';
import AlertContext from '../../../context/alert/alertContext';
import useRefreshToken from '../../../hooks/useRefreshToken';

const UserForm = () => {
  const { LoginUser, user: currentUser } = useContext(UserContext);
  const { SetAlert } = useContext(AlertContext);
  const [user, SetUser] = useState(currentUser || { name: '', password: '' });
  const { name } = user;

  useRefreshToken();

  const OnSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      SetAlert('Please set a name for the new user', 'danger');
    } else {
      LoginUser(user);
    }
  };

  return (
    <form onSubmit={OnSubmit}>
      <Title title='User' currentState={currentUser} deleteState={null} />
      <TextBox
        name='name'
        state={user}
        placeholder='Enter user name'
        SetState={SetUser}
        type='text'
      />
      <TextBox
        name='password'
        state={user}
        placeholder='Enter password'
        SetState={SetUser}
        type='password'
      />
      <SubmitButton
        title='User'
        currentState={currentUser}
        deleteState={false}
      />
    </form>
  );
};

export default UserForm;
