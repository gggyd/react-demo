import RequestModule from '../requestModule'
const request = new RequestModule()

let user = {
  login(data) {
    return request.postWithFormData({
      path: '/user/login',
      debugPath: '/mockapi/login.json',
      method: 'POST',
      body: data
    })
  },

  logout() {
    return request.postWithFormData({
      path: '/user/logout',
      debugPath: '/mockapi/response-success.json',
      method: 'POST',
      body: new FormData()
    })
  },

  getAdminInfo() {
    return request.getWithQueryParams({
      path: '/user/admin/userinfo',
      debugPath: '/mockapi/user-list.json'
    })
  }
}

export default user