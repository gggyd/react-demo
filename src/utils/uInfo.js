import { Cookies } from 'react-cookie'
const uInfoKey = 'uInfo'
const cookies = new Cookies();

export default {
  getUInfo: function() {
    let uInfo = localStorage.getItem(uInfoKey)
    uInfo = cookies.get(uInfoKey)

    if (!uInfo) {
      return false;
    }

    return JSON.parse(uInfo)
  },

  setUInfo: function(info) {
    localStorage.setItem(uInfoKey, JSON.stringify(info))
    cookies.set(uInfoKey, JSON.stringify(info))
  }
}