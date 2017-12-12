import RequestModule from '../requestModule'
const request = new RequestModule()

let topo = {
  getTopo(queryParams) {
    return request.getWithQueryParams({
      path: '',
      debugPath: '/mockapi/user/monitor/topo/get-topo.json'
    })
  }
}

export default topo