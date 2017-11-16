import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Form, Row, Col, Input, Button, Icon } from 'antd'
import UserActionCreators from '../actions/userActionCreators'
const FormItem = Form.Item

class UserInfo extends Component {
  state = {
    expand: false,
  }
  
  componentDidMount() {
    this.props.getUserList();
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  colums = [{
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: text => <span>{text}</span>
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  }]

  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      )
    }
    return children;
  }

  render() {
    let { list } = this.props;
    let items = (list && list.items) || [ ];

    return (
      <div>
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
      <br />
        {items.length > 0 && <Table columns={this.colums} dataSource={items.map(((item, index) => {
          item.key = index;
          return item;
          }))}/>}
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    list: state.index.user.list
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => (dispatch(UserActionCreators.getAdminUserList()))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserInfo))