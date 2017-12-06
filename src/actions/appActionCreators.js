export const CHANGE_APP_THEME = 'CHANGE_APP_THEME'

let AppActionCreators = {
  changeAppTheme(name) {
    return {
      type: CHANGE_APP_THEME,
      data: name
    }
  }
}

export default AppActionCreators