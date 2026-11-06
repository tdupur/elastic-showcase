import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { TeamProvider } from './context/TeamContext'
import App from './App.jsx'
import PresenterView from './presenter/PresenterView.jsx'
import { isPresenterView } from './presenter/sync'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isPresenterView() ? (
      <PresenterView />
    ) : (
      <ThemeProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </ThemeProvider>
    )}
  </React.StrictMode>,
)
