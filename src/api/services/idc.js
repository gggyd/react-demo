import RequestModele from '../requestModule'
const request = new RequestModele()

let idc = {
  getList(queryParams) {
    return request.getWithQueryParams({
      path: '',
      debugPath: '/mockapi/resource/idc/list.json',
      queryParams
    })
  },

  getDropDownList() {
    return request.get({
      path: '',
      debugPath: '/mockapi/resource/idc/dropdownlist.json'
    })
  }
}

export default idc