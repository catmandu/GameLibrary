
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Games from './components/main/games/Games';
import GameForm from './components/main/games/GameForm';
import GameState from './context/main/game/GameState';
import Developers from './components/main/developers/Developers';
import DeveloperForm from './components/main/developers/DeveloperForm';
import DeveloperState from './context/main/developer/DeveloperState';
import Publishers from './components/main/publishers/Publishers';
import PublisherForm from './components/main/publishers/PublisherForm';
import PublisherState from './context/main/publisher/PublisherState';
import Genres from './components/main/genres/Genres';
import GenreForm from './components/main/genres/GenreForm';
import GenreState from './context/main/genre/GenreState';
import Platforms from './components/main/platforms/Platforms';
import PlatformForm from './components/main/platforms/PlatformForm';
import PlatformState from './context/main/platform/PlatformState';
import AlertState from './context/alert/AlertState';
import Alert from './components/layout/Alert';
import ConfirmState from './context/confirm/ConfirmState';
import Confirm from './components/layout/Confirm';
import './App.css';

const App = () =>
{
  return (
    <GameState>
      <DeveloperState>
        <PublisherState>
          <GenreState>
            <PlatformState>
              <AlertState>
                <ConfirmState>                  
                  <Router>
                    <div className='App'>
                      <Navbar/>
                      <div className='container'>                                 
                        <Alert/>               
                        <Confirm/>
                        <Switch>
                          <Route exact path='/' component={Home} />
                          <Route exact path='/availableGames' component={Games} />
                          <Route exact path='/game' component={GameForm} />
                          <Route exact path='/availableDevelopers' component={Developers} />
                          <Route exact path='/developer' component={DeveloperForm} />
                          <Route exact path='/availablePublishers' component={Publishers} />
                          <Route exact path='/publisher' component={PublisherForm} />
                          <Route exact path='/availableGenres' component={Genres} />
                          <Route exact path='/genre' component={GenreForm} />
                          <Route exact path='/availablePlatforms' component={Platforms} />
                          <Route exact path='/platform' component={PlatformForm} />
                        </Switch>
                      </div>
                    </div>
                  </Router>
                </ConfirmState>
              </AlertState>
            </PlatformState>            
          </GenreState>          
        </PublisherState>      
      </DeveloperState>
    </GameState>
  );
};

export default App;
