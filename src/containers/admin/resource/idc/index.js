import React, { Component } from 'react'
import { Table, Form, Row, Col, Button } from 'antd'
import idcActionCreators from '../../../../actions/admin/resource/idcActionCreators'
import { connect } from 'react-redux'

const FormItem = Form.Item

class index extends Component {
  state = {
    queryParams: {

    }
  }

  componentDidMount() {
    this.props.getListAndPagination(this.state.queryParams)
  }

  handleEditClick = (e, record) => {
    e.preventDefault()

    let { history } = this.props

    history.push({
      pathname: '/idc/edit',
      search: 'id=' + record.idcID
    })
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
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#" onClick={(e) => this.handleEditClick(e, record)}>修改</a>
        </span>
      )
    }
  ]

  render() {
    let { idc } = this.props
    let { listAndPagination } = idc
    let items = (listAndPagination && listAndPagination.items) || []

    return (
      <div>
        <Form>
          <FormItem
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 2, offset: 22 }
            }}
          >
            <Button 
              type="primary" 
              htmlType="button" 
              icon="plus" 
              onClick={e => {
                e.preventDefault()
                let { history } = this.props
                history.push({
                  pathname: '/idc/edit'
                })
              }}
              style={{
                width: '100%'
              }} >新建</Button>
          </FormItem>
        </Form>
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
    getListAndPagination: (queryParams) => dispatch(idcActionCreators.getList(queryParams)),
    selectedItem: (item) => dispatch(idcActionCreators.selectedItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(index))