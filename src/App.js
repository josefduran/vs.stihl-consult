import React from 'react'
import { Provider } from 'react-redux';
import { AppRouter } from './routes/AppRouter';
import { store } from './redux/store/store';

import './styles/index.css';
import 'animate.css';
import { FormModalProvider } from './context/FormModalContext';

const App = () => {


  return (
    <>
      <Provider store={ store } >
        <FormModalProvider>
        <AppRouter />
        </FormModalProvider>
      </Provider>
    </>
  )
}

export default App
