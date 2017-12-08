import { Cookies } from 'react-cookie'
const uInfoKey = 'userInfo'
const rdsIdKey = 'rdsId'
const cookies = new Cookies()

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

  getAuthInfo() {
    let userInfo = localStorage.getItem(uInfoKey)
    let rdsId = localStorage.getItem(rdsIdKey)
    let authenticated = false
    
    if (!userInfo) {
      userInfo = cookies.get(uInfoKey)
    }

    if (!userInfo) {
      userInfo = { }
    } else {
      userInfo = JSON.parse(userInfo)
      authenticated = true
    }
    
    return {
      userInfo,
      rdsId,
      authenticated
    }
  },

  setUserInfo(info) {
    localStorage.setItem(uInfoKey, JSON.stringify(info))
    cookies.set(uInfoKey, JSON.stringify(info))
  },

  setRdsId(rdsId) {
    localStorage.setItem(rdsIdKey, rdsId)
  },

  removeUserInfo() {
    localStorage.removeItem(uInfoKey)
    cookies.remove(uInfoKey)
    localStorage.removeItem(rdsIdKey)
  }
}