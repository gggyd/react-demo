import fetch from 'isomorphic-fetch';

export default class RequestModul {
  static BASE_URL = 'http://192.168.200.89:5526';
  static headers = {

  };

  constructor() {
    this._checkStatus = this._checkStatus.bind(this);
    this._parseJSON = this._parseJSON.bind(this);
    this._parseText = this._parseText.bind(this);
    this._fetchWithCORS = this._fetchWithCORS.bind(this);
  }

  _checkStatus(resp) {
    if (resp.status >= 200 && resp.status < 300) {
      return resp
    } else {
      var error = new Error(resp.statusText);
      error.resp = resp;
      throw error;
    }
  }

  _parseJSON(resp) {
    if (!!resp) {
      return resp.json();
    } else {
      return undefined;
    }
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
      .then(this._checkStatus, (error) => {
        return error;
      })
      .then(contentType === 'json' ? this._parseJSON: this._parseText, (error) => {
        return error;
      });
  }

  get({BASE_URL=RequestModul.BASE_URL, path='/', method='GET', contentType='json'}) {
    const packageRequestURL = `${BASE_URL}${path}`;

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method
    }, contentType);
  }

  getWithQueryParams({BASE_URL=RequestModul.BASE_URL, path='/', queryParams={}, method='GET', contentType='json'}) {
    let queryString = '';
    for (let key in queryParams) {
      queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;
    }
    let encodedQueryString = (queryString);

    const packageRequestURL = `${BASE_URL}${path}?${encodedQueryString}`;

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method
    }, contentType);
  }

  getWithRequestData({BASE_URL=RequestModul.BASE_URL, path='/', requestData={}, method='GET', contentType='json'}) {
    let requestDataString = encodeURIComponent(JSON.stringify(requestData));

    const packageRequestURL = `${BASE_URL}${path}?requestData=${requestDataString}`;

    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method
    }, contentType);
  }

  post({BASE_URL=RequestModul.BASE_URL, path='/', body=undefined, method='POST', contentType='json'}) {
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

  postWithFormData({BASE_URL=RequestModul.BASE_URL, path='/', body={}, method='POST', contentType='json'}) {
    const packageRequestURL = `${BASE_URL}${path}`;
        
    return this._fetchWithCORS({
      url: packageRequestURL,
      method: method,
      body: body
    }, contentType);
  }
}