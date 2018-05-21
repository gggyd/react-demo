/**
 * languageProvider
 */

import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

class LanguageProvider extends React.PureComponent {
  render() {
    let local = this.props.language
    return (
      <IntlProvider locale = {local} key = {local} messages = { this.props.messages[local]} >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language
  }
}

export default connect(mapStateToProps)(LanguageProvider)