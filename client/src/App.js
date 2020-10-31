import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import NavigationComponent from './components/NavigationComponent';
import FooterComponent from './components/FooterComponent';

import HomeScreen from './screens/HomeScreen';
import NextDaysScreen from './screens/NextDaysScreen';
import NextWeekScreen from './screens/NextWeekScreen';
import AlertsScreen from './screens/AlertsScreen';
import './App.css';


function App() {



  return (
    <div className="App">
      <Router>
        <div className="container">

          <header className="header">
            <NavigationComponent />
          </header>

          <main className="main">
            <HomeScreen />
            <NextDaysScreen />
            <NextWeekScreen />
            <AlertsScreen />
            <FooterComponent />
          </main>

        </div>
      </Router>
    </div>
  );
}

export default App;
