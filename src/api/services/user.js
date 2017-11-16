import RequestModul from '../requesModul'
const request = new RequestModul()

let user = {
  login(data) {
    return request.postWithFormData({
      path: '/user/login',
      method: 'POST',
      body: data
    })
  },

  getAdminInfo() {
    return request.getWithQueryParams({
      path: '/user/admin/userinfo'
    })
  }
}

export default user