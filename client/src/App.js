import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import UserForm from './components/main/users/UserForm';
import Games from './components/main/games/Games';
import GameForm from './components/main/games/GameForm';
import Developers from './components/main/developers/Developers';
import DeveloperForm from './components/main/developers/DeveloperForm';
import Publishers from './components/main/publishers/Publishers';
import PublisherForm from './components/main/publishers/PublisherForm';
import Genres from './components/main/genres/Genres';
import GenreForm from './components/main/genres/GenreForm';
import Platforms from './components/main/platforms/Platforms';
import PlatformForm from './components/main/platforms/PlatformForm';
import Alert from './components/layout/Alert';
import Confirm from './components/layout/Confirm';
import './App.css';

const App = () => {
  return (
    <div className='container'>
      <Alert />
      <Confirm />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/availableGames' element={<Games />} />
        <Route path='/game' element={<GameForm />} />
        <Route path='/availableDevelopers' element={<Developers />} />
        <Route path='/developer' element={<DeveloperForm />} />
        <Route path='/availablePublishers' element={<Publishers />} />
        <Route path='/publisher' element={<PublisherForm />} />
        <Route path='/availableGenres' element={<Genres />} />
        <Route path='/genre' element={<GenreForm />} />
        <Route path='/availablePlatforms' element={<Platforms />} />
        <Route path='/platform' element={<PlatformForm />} />
        <Route path='/user' element={<UserForm />} />
      </Routes>
    </div>
  );
};

export default App;
