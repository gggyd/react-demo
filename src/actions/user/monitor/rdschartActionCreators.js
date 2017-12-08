import rdschartService from '../../../api/services/rdschart'

export const REQUEST_RDS_CHART_PERFORMANCE = 'REQUEST_RDS_CHART_PERFORMANCE'
export const RECEIVE_RDS_CHART_PERFORMANCE = 'RECEIVE_RDS_CHART_PERFORMANCE'

let rdschartActionCreators = {
  getPerformance(queryParams) {
    return (dispatch) => {
      dispatch({
        type: REQUEST_RDS_CHART_PERFORMANCE
      })

      rdschartService.getPerformanceData(queryParams)
        .then(json => {
          dispatch({
            type: RECEIVE_RDS_CHART_PERFORMANCE,
            data: json.data
          })
        })
    }
  }
}

export default rdschartActionCreators