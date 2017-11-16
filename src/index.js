import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import RouterComponent from './router'

import './style/index.css'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
      <RouterComponent />
    </Provider>
  , document.getElementById('root'))
registerServiceWorker()
