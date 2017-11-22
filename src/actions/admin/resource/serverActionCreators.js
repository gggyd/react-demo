import serverService from '../../../api/services/server'

export const REQUEST_SERVER_LIST = 'REQUEST_SERVER_LIST'
export const RECEIVE_SERVER_LIST = 'RECEIVE_SERVER_LIST'

let serverActionCreator = {
  getList() {
    return (dispatch) => {
      dispatch({
        type: REQUEST_SERVER_LIST
      })

      serverService.getList()
        .then(json => {
          dispatch({
            type: RECEIVE_SERVER_LIST,
            data: json.data
          })
        })
    }
  }
}

export default serverActionCreator