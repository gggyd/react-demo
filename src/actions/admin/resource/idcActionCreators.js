import idcService from '../../../api/services/idc'

export const REQUEST_IDC_LIST = 'REQUEST_IDC_LIST'
export const RECEIVE_IDC_LIST = 'RECEIVE_IDC_LIST'
export const SELECTED_ITEM = 'SELECTED_ITEM'
export const CHANGE_SELECTED_ITEM = 'CHANGE_SELECTED_ITEM'

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
  },

  selectedItem: (item) => (
    {
      type: SELECTED_ITEM,
      data: item
    }
  ),

  changeSelectedItem: (item) => (
    {
      type: CHANGE_SELECTED_ITEM,
      data: item
    }
  )
}

export default idcActionCreators