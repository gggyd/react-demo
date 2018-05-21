import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import RouterComponent from './router'
import { translationMessages } from './i18n'
import LanguageProvider from './languageProvider'

import './style/index.less'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages = {translationMessages} >
        <RouterComponent />
      </LanguageProvider>
    </Provider>
  , document.getElementById('root'))
registerServiceWorker()
