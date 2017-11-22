import RequestModule from '../requestModule'
const request = new RequestModule()

let menu = {
  getMenu() {
    return request.get({
      path: '/user/menu',
      debugPath: '/mockapi/admin-menu.json',
      method: 'GET'
    })
  }
}

export default menu