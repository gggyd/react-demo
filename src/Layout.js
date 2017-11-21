import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import {
  Route,
  Redirect,
  Switch,
  withRouter,
  Link
} from 'react-router-dom';
import UserInfo from './containers/userInfo';
import LayoutHeader from './containers/layout/header';
import LayoutSider from './containers/layout/sider';

const { Content } = Layout;
const breadcrumbNameMap = {
  '/': '首页',
  '/user': '用户'
};

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
    let { location, match } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    })

    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems)

    return (
      <Layout style={{
        height: '100%'
      }}>
        <LayoutHeader collapsed={this.state.collapsed} toggleSider={this.toggleSider} />
        <Layout>
          <LayoutSider collapsed={this.state.collapsed} />
          <Layout>

          <Breadcrumb style={{ margin: '16px 0 0 16px' }}>
                {breadcrumbItems}
              </Breadcrumb>
            <Content style={{
              margin: '12px 16px 24px 16px',
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
