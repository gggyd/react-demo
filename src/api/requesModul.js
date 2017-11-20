import fetch from 'isomorphic-fetch'
import store from '../store'
import config from '../config'
import authActionCreators from '../actions/authActionCreators'
import messageUtil from '../utils/message'

export default class RequestModul {
  static BASE_URL = 'http://192.168.200.89:5526'
  static headers = {

  };

  constructor() {
    this._checkStatus = this._checkStatus.bind(this)
    this._parseJSON = this._parseJSON.bind(this)
    this._parseText = this._parseText.bind(this)
    this._fetchWithCORS = this._fetchWithCORS.bind(this)
    this._handleApiCode = this._handleApiCode.bind(this)
  }

  _checkStatus(resp) {
    if (resp.status >= 200 && resp.status < 300) {
      return resp
    } else {
      var error = new Error(resp.statusText);
      error.resp = resp;
      return error;
    }
  }

  _parseJSON(resp) {
    if (Object.prototype.toString.call(resp) === '[object Error]') {
      return resp
    }

    if (!!resp && !!resp.json) {
      return resp.json()
    } else {
      return undefined;
    }
  }

  _handleApiCode(json) {
    if (Object.prototype.toString.call(json) === '[object Error]') {
      switch (json.message) {
        case 'Failed to fetch':
          messageUtil.openNotificationWithIcon({
            type: 'error',
            message: '请检查你的网络',
            duration: null
          });
          break
        default:
          break
      }
      return Promise.reject(json.message);
    }

    let code = json.code;

    if (code === 0) return json;

    let errMsg = ''
    switch (code) {
      case -1:
        console.log(json);
        json.message.forEach((msg) => {
          messageUtil.openNotificationWithIcon({
            type: 'error',
            message: msg.errorMessage
          })
        })
        
        break;
      case 19000:// 数据访问错误

        break;
      case 10003:// 请求参数错误

        break;
      case 10009:// 未登录访问其他接口，跳转到登录
        store.dispatch(authActionCreators.logout())
        
        messageUtil.openNotificationWithIcon({
          type: 'warning',
          message: '请重新登录'
        })
        errMsg = '10009'
        break;

      case 31605:// 默认密码，回到修改密码界面
      default:
    }

    return Promise.reject(errMsg)
  }

  _parseText(resp) {
    if (!!resp) {
      return resp.text();
    } else {
      return undefined;
    }
  }

  _fetchWithCORS(packageRequestURL, contentType) {
    let {
      method = 'GET',
      url,
      body
    } = packageRequestURL;

    if (method.toUpperCase() === 'GET') {
      body = undefined;
    }

    return fetch(url, {
      method,
      mode: 'cors',
      headers: RequestModul.headers,
      credentials: 'include',
      body
    })
      .then(this._checkStatus, error => {
        return error
      })
      .then(contentType === 'json' ? this._parseJSON : this._parseText, error => {
        return error
      })
      .then(this._handleApiCode, error => {
        return error
      })
  }

  get({ BASE_URL = RequestModul.BASE_URL, path = '/', debugPath = '', method = 'GET', contentType = 'json' }) {
    let packageRequestURL = `${BASE_URL}${path}`;

    if (config.isDebug) {
      packageRequestURL = `${debugPath}`
    }

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method
    }, contentType);
  }

  getWithQueryParams({ BASE_URL = RequestModul.BASE_URL, path = '/', debugPath = '', queryParams = {}, method = 'GET', contentType = 'json' }) {
    let queryString = '';
    for (let key in queryParams) {
      queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;
    }
    let encodedQueryString = (queryString);

    let packageRequestURL = `${BASE_URL}${path}?${encodedQueryString}`;

    if (config.isDebug) {
      packageRequestURL = `${debugPath}`
    }

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method
    }, contentType);
  }

  post({ BASE_URL = RequestModul.BASE_URL, path = '/', body = undefined, method = 'POST', contentType = 'json' }) {
    const packageRequestURL = `${BASE_URL}${path}`;

    if (!body) {
      body = JSON.stringify(body);
    }

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method,
      body: body
    }, contentType);
  }

  postWithFormData({ BASE_URL = RequestModul.BASE_URL, path = '/', debugPath = '', body = {}, method = 'POST', contentType = 'json' }) {
    let packageRequestURL = `${BASE_URL}${path}`;
    if (config.isDebug) {
      packageRequestURL = `${debugPath}`
      method = 'GET'
    }

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method,
      body: body
    }, contentType);
  }
}