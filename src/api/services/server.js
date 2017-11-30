import RequestModule from '../requestModule'
const request = new RequestModule()

let server = {
  getList() {
    return request.get({
      path: '/admin/server/list',
      debugPath: '/mockapi/resource/server/list.json',
      method: 'GET'
    })
  },

  getDetail(id) {
    let queryParams = {
      id: id
    }

    return request.getWithQueryParams({
      path: '',
      debugPath: '/mockapi/resource/server/detail.json',
      queryParams
    })
  },

  create(server) {
    return request.post({
      path: '/admin/server/create',
      debugPath: '/mockapi/response-success.json',
      body: server
    })
  }
}

export default server