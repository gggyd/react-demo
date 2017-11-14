import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import authActionCreators from '../actions/authActionCreators';
import { Form, Icon, Input, Button } from 'antd';
import './login.css';

const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();

    this.onLogin = this.onLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    isLogin: false
  }

  onLogin = function({
    userName,
    password
  }) {
    this.props.login({userName, password});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;

      this.onLogin(values);
    });
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { auth } = this.props;
    if (auth.authenticated) {
      return (
        <Redirect to={from}/>
      )
    }

    const { getFieldDecorator } = this.props.form;

    return (auth.authenticated ? 
    <div>Logon</div>
    : <div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请添写用户名'}]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请添写密码'}]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button> 或 <a href="">注册</a>
      </Form>
    </div>)
  }
}

const WrappedLoginForm = Form.create()(Login);

const mapStateToProps = (state) => {
  state;
  return {
    auth: state.index.auth
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleAuthenticated: () => dispatch(authActionCreators.toggleAuthState()),
  login: ({userName, password}) => dispatch(authActionCreators.login({userName, password}))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm));