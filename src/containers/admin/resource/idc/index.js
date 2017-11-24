import React, { Component } from 'react'
import { Table, Form, Input, Row, Col, Button, Popconfirm, Modal } from 'antd'
import idcActionCreators from '../../../../actions/admin/resource/idcActionCreators'
import { connect } from 'react-redux'

import './index.css'

const FormItem = Form.Item

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    { editable 
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
)

class ModalEditForm extends Component {
  render() {
    const { visible, onCancel, onCreateOrModify, form } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        visible={visible}
        title="新建/修改"
        okText="确定"
        onCancel={onCancel}
        onOk={onCreateOrModify}
      >
        <Form layout="vertical">
          <FormItem title="编号">
            {
              getFieldDecorator('idcID', {
                rules: [{ required: true, message: '必填'}]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('idcName', {
                rules: [{ required: true, message: '必填'}]
              })(
                <Input type="textarea" />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrapperModalEditForm = Form.create({
  mapPropsToFields(props) {
    const { selectedItem } = props.idc
    return {
      idcID: selectedItem.idcID,
      idcName: selectedItem.idcName
    }
  },

  onFieldsChange(props, changedFields) {
    console.log('changedFields', changedFields)
  }
})(ModalEditForm)

class index extends Component {
  state = {
    queryParams: { },
    modalVisible: false
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

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  handleCreateOrModify = () => {
    const form = this.form

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('values', values)
      form.resetFields()
      this.setState({
        modalVisible: false
      })
    })
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'idcID',
      key: 'idcID',
      render: (text, record) => this.renderColumns(text, record, 'idcID')
    },
    {
      title: '名称',
      dataIndex: 'idcName',
      key: 'idcName',
      render: (text, record) => this.renderColumns(text, record, 'idcName')
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        const { editable } = record
        
        return (
          <div className="editable-row-operations" >
            {
              editable ?
                <span>
                  <a href="#" onClick={(e) => this.save(e, record.key)}>保存</a>
                  <Popconfirm title="确认取消？" onConfirm={() => this.cancel(record.key)} >
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>编辑</a>
            }
          </div>
        )
      }
    }
  ]

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    )
  }

  handleChange(value, key, column) {
    const newData = [...this.props.idc.listAndPagination.items]
    const target = newData.filter(item => key === item.key)[0]

    if (target) {
      target[column] = value
      this.props.setList(newData)
    }
  }

  edit(key) {
    const newData = [...this.props.idc.listAndPagination.items]
    const target = newData.filter(item => key == item.key)[0]

    if (target) {
      target.editable = true;
      this.props.setList(newData)
    }
  }

  save(e, key) {
    e.preventDefault()
    const newData = [...this.props.idc.listAndPagination.items]
    const target = newData.filter(item => (key === item.key))[0]

    if (target) {
      delete target.editable
      this.props.setList(newData)
    }
  }

  cancel(key) {
    const newData = [...this.props.idc.listAndPagination.items]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      delete target.editable
      this.props.setList(newData)
    }
  }
  
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
            <Button onClick={this.showModal}>新建(Modal)</Button>
          </FormItem>
        </Form>
        <WrapperModalEditForm
              ref={this.saveFormRef}
              idc={idc}
              visible={this.state.modalVisible}
              onCancel={this.handleCancel}
              onCreateOrModify={this.handleCreateOrModify}
         />
        {
          items.length > 0 && <Table bordered columns={this.columns} dataSource={items.map((item, index) => {
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
    setList: (list) => dispatch(idcActionCreators.setList(list)),
    selectedItem: (item) => dispatch(idcActionCreators.selectedItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(index))