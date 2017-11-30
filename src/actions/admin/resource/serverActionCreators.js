import serverService from '../../../api/services/server'

export const REQUEST_SERVER_LIST = 'REQUEST_SERVER_LIST'
export const RECEIVE_SERVER_LIST = 'RECEIVE_SERVER_LIST'

export const REQUEST_SERVER_DETAIL = 'REQUEST_SERVER_DETAIL'
export const RECEIVE_SERVER_DETAIL = 'RECEIVE_SERVER_DETAIL'

export const REQUEST_SERVER_CREATE = 'REQUEST_SERVER_CREATE'
export const RECEIVE_SERVER_CREATE = 'RECEIVE_SERVER_CREATE'

export const CHANGE_SERVER_DETAIL = 'CHANGE_SERVER_DETAIL'

let serverActionCreator = {
  getList() {
    return (dispatch) => {
      dispatch({
        type: REQUEST_SERVER_LIST
      })

      serverService.getList()
        .then(json => {
          console.table(json.data.items)
          dispatch({
            type: RECEIVE_SERVER_LIST,
            data: json.data
          })
        })
    }
  },

  getDetail(id) {
    return (dispatch) => {
      dispatch({
        type: REQUEST_SERVER_DETAIL
      })

      serverService.getDetail(id)
        .then(json => {
          dispatch({
            type: RECEIVE_SERVER_DETAIL,
            data: json.data
          })
        })
    }
  },

  create(detail) {
    return (dispatch) => {
      dispatch({
        type: REQUEST_SERVER_CREATE
      })

      serverService.create(detail)
        .then(json => {
          dispatch({
            type: RECEIVE_SERVER_CREATE,
            data: json.data
          })
        })
    }
  },

  changeDetail(detail) {
    return {
      type: CHANGE_SERVER_DETAIL,
      data: detail
    }
  }
}

export default serverActionCreator