import React, { Component } from 'react'
import serverActionCreators from '../../../../actions/admin/resource/serverActionCreators'
import { connect } from 'react-redux'
import { Table, Form, Row, Col, Button, Icon, Menu, Dropdown } from 'antd'

class index extends Component {
  constructor() {
    super()

    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    this.props.getListAndPagination()
  }

  colums = [
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
    }
  ]

  handleAdd() {
    let { history } = this.props

    history.push({
      pathname: '/user/abc/12',
      search: ''
    })
  }

  menus = (
    <Menu>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  render() {
    let { server } = this.props
    let { listAndPagination } = server
    let items = (listAndPagination && listAndPagination.items) || []

    return (
      <div>
        <Row>
          <Col span="4" offset="12">
            <Button type="primary" icon="plus" onClick={this.handleAdd}>新增</Button>
            <Dropdown overlay={this.menus} size="large">
              <Button>
                Actions <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col span="8">
            <Button.Group>
              <Button type="primary">
                <Icon type="left" />Backward
              </Button>
              <Button type="primary" onClick={this.handleAdd}><Icon type="plus" /> 新增</Button>
              <Button type="primary">
                Forward<Icon type="right" />
              </Button>
            </Button.Group>
          </Col>
        </Row>
        {items.length > 0 && <Table columns={this.colums} dataSource={items.map((item, index) => {
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