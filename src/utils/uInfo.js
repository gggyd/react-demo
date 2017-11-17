import { Cookies } from 'react-cookie'
const uInfoKey = 'userInfo'
const cookies = new Cookies();

export default {
  getUserInfo() {
    let userInfo = localStorage.getItem(uInfoKey)

    if (!userInfo) {
      userInfo = cookies.get(uInfoKey)
    }

    if (!userInfo) {
      return null;
    }

    return JSON.parse(userInfo)
  },

  setUserInfo(info) {
    localStorage.setItem(uInfoKey, JSON.stringify(info))
    cookies.set(uInfoKey, JSON.stringify(info))
  },

  removeUserInfo() {
    localStorage.removeItem(uInfoKey);
    cookies.remove(uInfoKey);
  }
}