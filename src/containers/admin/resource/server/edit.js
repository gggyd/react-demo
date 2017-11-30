import React, { Component } from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import serverActionCreators from '../../../../actions/admin/resource/serverActionCreators'
import queryString from 'query-string'
import { connect } from 'react-redux'

const { Item: FormItem, AreaText } = Form

class edit extends Component {
  state = {
    queryParams: {}
  }
  componentDidMount() {
    const { location } = this.props

    this.setState({
      queryParams: Object.assign({}, this.state.queryParams, queryString.parse(location.search))
    }, () => {
      this.props.getDetail()
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { validateFields } = this.props.form

    validateFields((err, values) => {
      if (!err) {
        console.log('values', values)
      }
    })
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}
            label="名称" >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '名称必填' }]
              })(
                <Input />
                )
            }
          </FormItem>
          <FormItem {...formItemLayout} 
            label="IP" >
            {
              getFieldDecorator('ip', {
                rules: [{ required: true, message: 'IP必填'}]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem {...tailFormItemLayout} >
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const wrapperEditForm = Form.create({
  mapPropsToFields(props) {
    const { detail } = props
    return {
      name: { value: detail.name },
      ip: { value: detail.ip }
    }
  }
})(edit);

const mapStateToProps = (state) => {
  return {
    detail: state.admin.resource.server.detail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => dispatch(serverActionCreators.getDetail(id)),
    changeDetail: (detail) => dispatch(serverActionCreators.changeDetail(detail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapperEditForm)