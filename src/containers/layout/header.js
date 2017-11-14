import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Badge } from 'antd';
import AuthActionCreators from '../../actions/authActionCreators';

const { Header } = Layout;

const LayoutHeader = (props) => (
  <Header className={props.collapsed && 'fold'} style={{ background: '#fff', padding: 0 }} >
    <div className="logo" />
    <Icon
      className="trigger"
      type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={props.toggleSider}
    />
    <Menu mode="horizontal" style={{
      float: 'right',
      lineHeight: '62px',
      marginRight: '8px'
    }}>
      <Menu.Item key="mail">
        <Badge count={25}>
          <Icon type="bell" />
        </Badge>
      </Menu.Item>
      <Menu.SubMenu style={{
        float: 'right'
      }} title={<span> <Icon type="user" />wangqqing</span>}
      >
        <Menu.Item key="logout">
          <a onClick={props.logout.bind(this)}>注销</a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </Header>
)

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  logout: () => (dispatch(AuthActionCreators.toggleAuthState()))
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader);

