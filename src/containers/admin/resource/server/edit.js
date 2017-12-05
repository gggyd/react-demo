import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import serverActionCreators from '../../../../actions/admin/resource/serverActionCreators'
import idcActionCreators from '../../../../actions/admin/resource/idcActionCreators'
import queryString from 'query-string'
import { connect } from 'react-redux'
import messageUtil from '../../../../utils/message'

import './edit.css'

const { Item: FormItem } = Form
const { TextArea } = Input
const { Option } = Select

const getFormItemList = (scope) => {
  const { handleLoginModeChange } = scope
  const { detail, idcDropDownList, form } = scope.props

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
      },
      onChange: handleLoginModeChange
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
      type: 'textarea',
      label: 'Pub Key',
      field: 'pubKey',
      hidden: +detail.loginMode.value === 1 ? true : false,
      rows: 6
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
    const { location, getIDCDropDownList, getPubKey } = this.props

    this.setState({
      queryParams: Object.assign({}, this.state.queryParams, queryString.parse(location.search))
    }, () => {
      getIDCDropDownList()
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
    const { form, create } = this.props
    const { validateFields } = form

    validateFields((err, values) => {
      if (!err) {
        console.log('values', values)
        const cb = (resp) => {
          messageUtil.openNotificationWithIcon({
            type: 'success',
            message: '服务器添加成功'
          })

          this.handleCancel()
        }

        create(values, cb)
      }
    })
  }

  handleCancel = (e) => {
    if (!!e && e.preventDefault) {
      e.preventDefault()
    }

    let { history } = this.props
    
    history.push({
      pathname: '/server',
      search: queryString.stringify(this.state.queryParams)
    })
    
  }

  handleFormChange = (e) => {
    const { form } = this.props
    console.log(e.target.value)
  }

  handleLoginModeChange = (value) => {
    console.log(value)
    if (value === '2') {
      this.props.getPubKey()
    }
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
    const { getFieldDecorator, getFieldValue } = form
    const formItemList = getFormItemList(this)

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
                  input = <Select onChange={item.onChange}>
                    {
                      item.selectOptions && item.selectOptions.map((option) => {
                        return <Option key={option.value} value={option.value}>{option.name}</Option>
                      })
                    }
                    </Select>;
                  break;
                case 'textarea':
                  input = <TextArea rows={item.rows} />
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
          <FormItem {...tailFormItemLayout} className="button-panel">
            <Button type="primary" htmlType="submit">确定</Button>
            <Button onClick={this.handleCancel}>取消</Button>
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
    const { detail, pubKey } = props
    const nextFields = { ...getMapPropsToFields(detail), ...{ pubKey: {value: pubKey} } }
    return nextFields
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
    idcDropDownList: state.admin.resource.idc.dropdownList,
    pubKey: state.admin.resource.server.pubKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => dispatch(serverActionCreators.getDetail(id)),
    changeDetail: (detail) => dispatch(serverActionCreators.changeDetail(detail)),
    getIDCDropDownList: () => dispatch(idcActionCreators.getDropDownList()),
    getPubKey: () => dispatch(serverActionCreators.getPubKey()),
    create: (detail, cb) => dispatch(serverActionCreators.create(detail, cb))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapperEditForm)