import React, { Component } from 'react';
import { Layout} from 'antd';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import UserInfo from './containers/userInfo';
import LayoutHeader from './containers/layout/header';
import LayoutSider from './containers/layout/sider';

const { Content } = Layout;
class LayoutComponent extends Component {
  constructor() {
    super();

    this.toggleSider = this.toggleSider.bind(this);
  }

  state = {
    collapsed: false
  }

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let { match } = this.props;

    return (
      <Layout style={{
        height: '100%'
      }}>
        <LayoutHeader collapsed={this.state.collapsed} toggleSider={this.toggleSider} />
        <Layout>
          <LayoutSider collapsed={this.state.collapsed} />
          <Layout>
            <Content style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff'
            }}>
              <Switch>
                <Route path={`${match.path}`} exact component={UserInfo} />
                <Route path={`${match.path}user`} component={UserInfo} />
                <Redirect to={`${match.url}`} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
};

export default LayoutComponent;
