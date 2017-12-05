import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import serverActionCreators from '../../../../actions/admin/resource/serverActionCreators'
import idcActionCreators from '../../../../actions/admin/resource/idcActionCreators'
import queryString from 'query-string'
import { connect } from 'react-redux'

const { Item: FormItem, AreaText } = Form
const { Option } = Select

const getFormItemList = (props) => {
  const { detail, idcDropDownList, form } = props

  return [
    {
      label: '名称',
      field: 'name',
      placeholder: '不超过16个字符，只支持字母开头的数字，字母，下划线',
      fieldOptions: {
        rules: [
          { required: true, message: '名称必填' }
        ]
      }
    },
    {
      type: 'select',
      label: '服务器类型',
      field: 'type',
      selectOptions: detail.typeList,
      fieldOptions: {
        initialValue: detail.type.value.toString()
      }
    },
    {
      type: 'select',
      label: '服务器用途',
      field: 'serverDifference',
      selectOptions: detail.serverDifferenceList,
      fieldOptions: {
        initialValue: detail.serverDifference.value.toString()
      }
    },
    {
      type: 'select',
      label: '协议',
      field: 'protocol',
      selectOptions: detail.protocolList,
      fieldOptions: {
        initialValue: detail.protocol.value.toString()
      }
    },
    {
      label: '端口',
      field: 'port',
      fieldOptions: {
        rules: [{ required: true, message: '端口不能为空' }]
      }
    },
    {
      label: 'IP',
      field: 'ip',
      fieldOptions: {
        rules: [{ required: true, message: 'IP必填'}]
      }
    },
    {
      type: 'select',
      label: '登录方式',
      field: 'loginMode',
      selectOptions: detail.loginModeList,
      fieldOptions: {
        initialValue: detail.loginMode.value.toString()
      }
    },
    {
      label: '用户名',
      field: 'username',
      fieldOptions: {
        rules: [{ required: true, message: '用户名必填'}]
      }
    },
    {
      label: '密码',
      field: 'password',
      fieldOptions: {
        rules: [{ required: true, message: '必填' }]
      },
      hidden: +detail.loginMode.value === 2 ? true : false
    },
    {
      label: 'Pub Key',
      field: 'pubkey',
      hidden: +detail.loginMode.value === 1 ? true : false
    },
    {
      type: 'select',
      label: '机房',
      field: 'idcPosId',
      selectOptions: idcDropDownList.map((item) => (
        {
          name: item.idcName,
          value: item.idcID.toString()
        }
      )),
      fieldOptions: {
        initialValue: detail.idcPosId.value.toString()
      }
    }
  ]
} 

class edit extends Component {
  state = {
    queryParams: {}
  }

  componentDidMount() {
    const { location } = this.props

    this.setState({
      queryParams: Object.assign({}, this.state.queryParams, queryString.parse(location.search))
    }, () => {
      this.props.getIDCDropDownList()
    })
  }

  componentWillReceiveProps(nextProps) {
    //IDCDropDownList
    if (nextProps.idcDropDownList.length !== this.props.idcDropDownList.length) {
      this.props.getDetail()
    }
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

  handleFormChange = (e) => {
    const { form } = this.props
    console.log(e.target.value)
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
    const { detail, form } = this.props
    const { getFieldDecorator } = form
    const formItemList = getFormItemList(this.props)

    return (
      <div ref="edit">
        <Form onSubmit={this.handleSubmit}>
          {
            formItemList && formItemList.map((item) => {
              if (item.hidden) {
                return null
              }

              let input = null;
              switch (item.type) {
                case 'select':
                  input = <Select>
                    {
                      item.selectOptions && item.selectOptions.map((option) => {
                        return <Option key={option.value} value={option.value}>{option.name}</Option>
                      })
                    }
                    </Select>;
                  break;
                default:
                  input = <Input placeholder={`${item.placeholder || ''}`} />
                  break;
              }

              return (<FormItem {...formItemLayout}
                key={`${item.field}`}
                label={`${item.label}`} >
                {
                  getFieldDecorator(`${item.field}`, item.fieldOptions)(input)
                }
              </FormItem>)
            })
          }
          <FormItem {...tailFormItemLayout} >
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const getMapPropsToFields = (fields) => {
  let keys = [
    'name',
    'protocal',
    'port',
    'ip',
    'username',
    'password'
  ]
  let nextFields = { }

  keys.forEach(key => {
    nextFields[key] = fields[key]
  })

  return nextFields
}

const wrapperEditForm = Form.create({
  mapPropsToFields(props) {
    const { detail } = props
    return getMapPropsToFields(detail)
  },
  onFieldsChange(props, fields) {
    if (Object.keys(fields).length > 0) {
      props.changeDetail(fields)
    }
  }
})(edit);

const mapStateToProps = (state) => {
  return {
    detail: state.admin.resource.server.detail,
    idcDropDownList: state.admin.resource.idc.dropdownList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => dispatch(serverActionCreators.getDetail(id)),
    changeDetail: (detail) => dispatch(serverActionCreators.changeDetail(detail)),
    getIDCDropDownList: () => dispatch(idcActionCreators.getDropDownList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapperEditForm)