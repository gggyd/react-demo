import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import RouterComponent from './router'
import i18n from './i18n'
import LanguageProvider from './languageProvider'
import messages from './translations'

import './style/index.less'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages = {messages} >
        <RouterComponent />
      </LanguageProvider>
    </Provider>
  , document.getElementById('root'))
registerServiceWorker()
