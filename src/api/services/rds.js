import RequestModele from '../requestModule'
const request = new RequestModele()

let rds = {
  getMenuList() {
    return request.get({
      path: '',
      debugPath: '/mockapi/resource/rds/menulist.json'
    })
  }
}

export default rds