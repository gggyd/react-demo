export const CHANGE_APP_THEME = 'CHANGE_APP_THEME'
export const CHANGE_APP_LANGUAGE = 'CHANGE_APP_LANGUAGE'

let AppActionCreators = {
  changeAppTheme(name) {
    return {
      type: CHANGE_APP_THEME,
      data: name
    }
  },
  changeAppLanguage(language) {
    return {
      type: CHANGE_APP_LANGUAGE,
      data: language
    }
  }
}

export default AppActionCreators