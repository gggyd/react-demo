import topoService from '../../../api/services/topo'

export const REQUEST_USER_TOPO = 'REQUEST_USER_TOPO'
export const RECEIVE_USER_TOPO = 'RECEIVE_USER_TOPO'

let topoActionCreators = {
  getTopo(queryParams) {
    return (dispatch) => {
      dispatch({
        type: REQUEST_USER_TOPO
      })

      topoService.getTopo(queryParams)
        .then(json => {
          dispatch({
            type: RECEIVE_USER_TOPO,
            data: json.data
          })
        })
    }
  }
}

export default topoActionCreators