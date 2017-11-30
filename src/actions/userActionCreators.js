import userService from '../api/services/user'

export const REQUEST_ADMIN_USER_LIST = 'REQUEST_ADMIN_USER_LIST'
export const RECEIVE_ADMIN_USER_LIST = 'RECEIVE_ADMIN_USER_LIST'

let UserActionCreators = {
  getAdminUserList() {
    return (dispatch) => {
      dispatch({
        type: REQUEST_ADMIN_USER_LIST
      });

      userService.getAdminInfo()
        .then(json => {
          console.table(json.data.items)
          return dispatch({
            type: RECEIVE_ADMIN_USER_LIST,
            data: json.data
          })
        })
        // .catch((err) => {
        //   console.log(err)
        // })
    }
  }
}

export default UserActionCreators