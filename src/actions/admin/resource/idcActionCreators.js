import idcService from '../../../api/services/idc'

export const REQUEST_IDC_LIST = 'REQUEST_IDC_LIST'
export const RECEIVE_IDC_LIST = 'RECEIVE_IDC_LIST'

let idcActionCreators = {
  getList(queryParams) {
    return (dispatch) => {
      dispatch({
        type: REQUEST_IDC_LIST
      })

      idcService.getList(queryParams)
        .then((json) => {
          dispatch({
            type: RECEIVE_IDC_LIST,
            data: json.data
          })
        })
    }
  }
}

export default idcActionCreators