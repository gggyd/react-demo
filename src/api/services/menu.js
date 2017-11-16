import RequestModul from '../requesModul'
const request = new RequestModul()

let menu = {
  getMenu() {
    return request.get({
      path: '/user/menu',
      method: 'GET'
    })
  }
}

export default menu