import RequestModule from '../requestModule'
const request = new RequestModule()

let server = {
  getList() {
    return request.get({
      path: '/admin/server/list',
      debugPath: '/mockapi/resource/server/list.json',
      method: 'GET'
    })
  }
}

export default server