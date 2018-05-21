/**
 * languageProvider
 */

import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

const DEFAULT_LOCALE = 'zh'

class LanguageProvider extends React.PureComponent {
  render() {
    let local = DEFAULT_LOCALE

    return (
      <IntlProvider locale = {local} key = {local} messages = { this.props.messages[local]} >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

export default LanguageProvider