import React, { Component } from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import queryString from 'query-string'
import idcActionCreators from '../../../../actions/admin/resource/idcActionCreators'

const FormItem = Form.Item

class edit extends Component {
  state = {
    queryParams: { }
  }

  componentDidMount = () => {
    let { location } = this.props
    this.setState({
      queryParams: queryString.parse(location.search)
    }, () => {
      console.log('fetch api...')
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let { form } = this.props
    form.validateFields((err, values) => {
      console.log('values', values)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    
    return (
      <div>
        <Form layout="inline"
          onSubmit={this.handleSubmit} >
        <FormItem label="编号">
            {getFieldDecorator('idcID', {
              rules: [{ required: true }],
            })(<Input />)}
          </FormItem>
          <FormItem label="名称">
            {getFieldDecorator('idcName', {
              rules: [{ required: true, message: 'idcName is required!' }],
            })(<Input />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedItem: state.admin.resource.idc.selectedItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSelectedItem: (item) => (dispatch(idcActionCreators.selectedItem(item)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields(props) {
    console.log('mapPropsToFields', props);
    let { selectedItem } = props

    return {
      idcID: { value: selectedItem.idcID },
      idcName: { value: selectedItem.idcName }
    }
  },
  onFieldsChange(props, fields) {
    console.log('onFieldsChange', fields)
    let keys = Object.keys(fields)
    let item = { }

    keys.forEach((key) => {
      item[key] = fields[key].value
    })
    
    props.changeSelectedItem(item)
  }
})(edit))