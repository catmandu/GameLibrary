import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/main/user/UserProvider';
import GameProvider from './context/main/game/GameProvider';
import DeveloperProvider from './context/main/developer/DeveloperProvider';
import PublisherProvider from './context/main/publisher/PublisherProvider';
import GenreProvider from './context/main/genre/GenreProvider';
import PlatformProvider from './context/main/platform/PlatformProvider';
import AlertProvider from './context/alert/AlertProvider';
import ConfirmProvider from './context/confirm/ConfirmProvider';
import Navbar from './components/layout/Navbar';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

Modal.setAppElement(rootElement);

root.render(
  <BrowserRouter>
    <AlertProvider>
      <ConfirmProvider>
        <UserProvider>
          <DeveloperProvider>
            <PlatformProvider>
              <GenreProvider>
                <PublisherProvider>
                  <GameProvider>
                    <Navbar icon='fas fa-gamepad' title='Game Library' />
                    <App />
                  </GameProvider>
                </PublisherProvider>
              </GenreProvider>
            </PlatformProvider>
          </DeveloperProvider>
        </UserProvider>
      </ConfirmProvider>
    </AlertProvider>
  </BrowserRouter>
);
