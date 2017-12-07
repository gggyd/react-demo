import rdsService from '../../api/services/rds'

export const REQUEST_RDS_MENU_LIST = 'REQUEST_RDS_MENU_LIST'
export const RECEIVE_RDS_MENU_LIST = 'RECEIVE_RDS_MENU_LIST'

let rdsActionCreators = {
  getRDSMenuList() {
    return (dispatch) => {
      dispatch({
        type: REQUEST_RDS_MENU_LIST
      })

      rdsService.getMenuList()
        .then((json) => {
          dispatch({
            type: RECEIVE_RDS_MENU_LIST,
            data: json.data
          })
        })      
    }
  }
}

export default rdsActionCreators