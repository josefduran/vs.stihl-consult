import React from 'react'
import { Provider } from 'react-redux';
import { AppRouter } from './routes/AppRouter';
import { store } from './redux/store/store';

import './styles/index.css';
import 'animate.css';
import { FormModalProvider } from './context/FormModalContext';

const App = () => {
  return (
    <div style={{ position:"absolute", left: 0, right: 0, bottom: 0, top: "0px"}}>
      <iframe width="100%" height="100%" frameborder="0" src="https://spectrio.github.io/vs.stihl-consult-ng/" />
    </div>
  )
}

export default App
