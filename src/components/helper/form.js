import React, { Component } from 'react'
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option

class FormHelper extends Component {
  render() {
    let children = []
    let { fields } = this.props

    if (Object.prototype.toString.call(fields) !== '[Object Array]') {
      return children
    }

    fields.forEach((item, index) => {
      let child = null
      let { type, ...rest } = item
      switch (item.type) {
        case 'inputNumber':
          child = <InputNumber key={index} {...rest} />
          break;
        default:
          child = <Input key={index} {...rest} />
          break;
      }

      children.push(child)
    })

    return (
      {children}
    )
  }
}

export default FormHelper