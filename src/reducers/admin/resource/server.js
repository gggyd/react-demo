import {
  REQUEST_SERVER_LIST,
  RECEIVE_SERVER_LIST,
  REQUEST_SERVER_DETAIL,
  RECEIVE_SERVER_DETAIL,
  CHANGE_SERVER_DETAIL
} from '../../../actions/admin/resource/serverActionCreators'
import { combineReducers } from 'redux'

const initialData = {
  listAndPagination: { },
  detail: { 
    flage: '',
    id: null,
    idcPosId: null,
    ip: '',
    loginMode: '',
    loginModeList: [
      {
        value: 1,
        name: '密码'
      },
      {
        value: 2,
        name: 'pub key'
      }
    ],
    name: '',
    password: '',
    port: 22,
    protocol: '',
    protocolList: [
      {
        value: 'ssh',
        name: 'ssh'
      }
    ],
    rdsServe: '',
    serverDifference: '',
    serverDifferenceList: [
      {
        value: 1,
        name: '数据源服务器'
      },
      {
        value: 2,
        name: '中间件服务器'
      }
    ],
    type: '',
    typeList: [
      {
        value: 1,
        name: '物理机'
      },
      {
        value: 2,
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
    case CHANGE_SERVER_DETAIL:
      return { ...state, ...action.data }
    default:
      return state
  }
}

let server = combineReducers({
  listAndPagination,
  detail
})

export default server