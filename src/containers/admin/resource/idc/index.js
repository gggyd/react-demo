import React, { Component } from 'react'
import { Table, Form, Row, Col } from 'antd'
import idcActionCreators from '../../../../actions/admin/resource/idcActionCreators'
import { connect } from 'react-redux'

class index extends Component {
  state = {
    queryParams: {

    }
  }
  componentDidMount() {
    this.props.getListAndPagination(this.state.queryParams)
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'idcID',
      key: 'idcID'
    },
    {
      title: '名称',
      dataIndex: 'idcName',
      key: 'idcName'
    }
  ]

  render() {
    let { idc } = this.props
    let { listAndPagination } = idc
    let items = (listAndPagination && listAndPagination.items) || []

    return (
      <div>
        {
          items.length > 0 && <Table columns={this.columns} dataSource={items.map((item, index) => {
            item.key = index
            return item
          })} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    idc: state.admin.resource.idc
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListAndPagination: (queryParams) => dispatch(idcActionCreators.getList(queryParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(index))