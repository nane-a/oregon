import React from 'react';
import './App.scss';
import { Router } from './setup/router/Router';

const App:React.FC = ():JSX.Element=>{
  return(<div>
    <Router/>
  </div>)
}

export default App;
