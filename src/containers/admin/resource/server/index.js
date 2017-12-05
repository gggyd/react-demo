import React, { Component } from 'react'
import serverActionCreators from '../../../../actions/admin/resource/serverActionCreators'
import { connect } from 'react-redux'
import { Table, Form, Row, Col, Button, Icon, Menu, Dropdown } from 'antd'
import queryString from 'query-string'

import './index.css'

class index extends Component {
  constructor() {
    super()

    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    this.props.getListAndPagination()
  }

  handleModifyClick = (e, record) => {
    e.preventDefault()

    const { history } = this.props

    history.push({
      pathname: '/server/edit',
      search: queryString.stringify({
        id: record.id
      })
    })
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '物理IP',
      dataIndex: 'ip',
      key: 'ip'
    },
    {
      title: '服务器用途',
      dataIndex: 'serverDifferenceStr',
      key: 'serverDifferenceStr'
    },
    {
      title: '中间件节点数',
      dataIndex: 'rdsServerQty',
      key: 'rdsServerQty'
    },
    {
      title: '数据源数量',
      dataIndex: 'mysqlQty',
      key: 'mysqlQty'
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr'
    },
    {
      title: '机房',
      dataIndex: 'idcPositionName',
      key: 'idcPositionName'
    },
    {
      title: '操作',
      key: 'options',
      render: (text, record) => {
        return (
          <div>
            <a href="#" onClick={(e) => this.handleModifyClick(e, record)}>修改</a>
          </div>
        )
      }
    }
  ]

  handleAdd() {
    let { history } = this.props

    history.push({
      pathname: '/user/abc/12',
      search: ''
    })
  }

  render() {
    let { server } = this.props
    let { listAndPagination } = server
    let items = (listAndPagination && listAndPagination.items) || []

    return (
      <div>
        <Row style={{marginBottom: 10}}>
          <Col span="2" offset="22">
            <Button type="primary" icon="plus" onClick={this.handleAdd}>新增</Button>
          </Col>
        </Row>
        {items.length > 0 && <Table columns={this.columns} dataSource={items.map((item, index) => {
          item.key = index;
          return item;
        })} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    server: state.admin.resource.server
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListAndPagination: () => dispatch(serverActionCreators.getList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(index))