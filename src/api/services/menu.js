import RequestModul from '../requesModul'
const request = new RequestModul()

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