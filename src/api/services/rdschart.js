import RequestModule from '../requestModule'
const request = new RequestModule()

let rdschart = {
  getPerformanceData(queryParams) {
    return request.getWithQueryParams({
      path: '',
      debugPath: '/mockapi/user/monitor/rdschart/performance.json'
    })
  }
}

export default rdschart