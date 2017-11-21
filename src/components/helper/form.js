import React, { Component } from 'react'
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, TimePicker, DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option

class FormHelper extends Component {
  render() {
    let children = []
    let {
      fields,
      from,
      formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      colLayout = {
        span: 8
      }} = this.props
    const { getFieldDecorator } = this.props.form;

    if (Object.prototype.toString.call(fields) !== '[object Array]') {
      return children
    }

    fields.forEach((item, index) => {
      let child = null
      let input = null
      let { type } = item
      switch (item.type) {
        case 'inputNumber':
          input = <InputNumber placeholder={`请添写${item.name}`} />
          break;
        case 'datePicker':
          input = <DatePicker />
          break;
        case 'timePicker':
          input = <TimePicker />
          break;
        default:
          input = <Input placeholder={`请添写${item.name}`} />
          break;
      }

      child = <Col {...colLayout} key={index + 1}>
        <FormItem {...formItemLayout} label={`${item.name}`}>
          {getFieldDecorator(`${item.field}`)(
            input
          )}
        </FormItem>
      </Col>

      children.push(child)
    })

    return children
  }
}

export default FormHelper