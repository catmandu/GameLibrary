import React from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';

const Home = () => {
  useRefreshToken();
  return (
    <div>
      <label>Hi there, there's games</label>
    </div>
  );
};

export default Home;
