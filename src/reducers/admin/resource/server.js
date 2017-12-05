import {
  REQUEST_SERVER_LIST,
  RECEIVE_SERVER_LIST,
  REQUEST_SERVER_DETAIL,
  RECEIVE_SERVER_DETAIL,
  CHANGE_SERVER_DETAIL,
  RECEIVE_SERVER_PUBKEY
} from '../../../actions/admin/resource/serverActionCreators'
import { combineReducers } from 'redux'

const initialData = {
  listAndPagination: { },
  detail: { 
    flage: { value: '' },
    id: { value: '' },
    idcPosId: { value: '' },
    ip: { value: '' },
    loginMode: { value: '' },
    loginModeList: [
      {
        value: '1',
        name: '密码'
      },
      {
        value: '2',
        name: 'pub key'
      }
    ],
    name: { value: '' },
    password: { value: '' },
    port: { value: '22' },
    protocol: { value: '' },
    protocolList: [
      {
        value: 'ssh',
        name: 'ssh'
      }
    ],
    rdsServe: { value: '' },
    serverDifference: { value: '1' },
    serverDifferenceList: [
      {
        value: '1',
        name: '数据源服务器'
      },
      {
        value: '2',
        name: '中间件服务器'
      }
    ],
    type: { value: '1' },
    typeList: [
      {
        value: '1',
        name: '物理机'
      },
      {
        value: '2',
        name: '虚拟机'
      }
    ]
  }
}

let listAndPagination = (state = initialData.listAndPagination, action) => {
  switch (action.type) {
    case RECEIVE_SERVER_LIST:
      return action.data
    default:
      return state
  }
}

let detail = (state = initialData.detail, action) => {
  switch (action.type) {
    case RECEIVE_SERVER_DETAIL:
      let keys = Object.keys(action.data)
      let nextData = { }
      keys.forEach((key) => {
        nextData[key] = {
          value: action.data[key]
        }
      })
      return { ...state, ...nextData }
    case CHANGE_SERVER_DETAIL:
      return { ...state, ...action.data }
    default:
      return state
  }
}


let pubKey = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_SERVER_PUBKEY:
      return action.data
    default:
      return state
  }
}

let server = combineReducers({
  listAndPagination,
  detail,
  pubKey
})

export default server