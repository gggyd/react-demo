import React from 'react'
import {
  Route,
  Redirect,
  Switch as RouteSwitch
} from 'react-router-dom'

import Dashboard from '../containers/dashboard'
import RdsList from '../containers/user/rdslist'
import RdsInfo from '../containers/user/rdsinfo'
import Resource from './resource'

const index = (props) => (
  <RouteSwitch>
    <Route path={`${props.match.path}`} exact component={Dashboard} />
    <Route path={`${props.match.path}rdslist`} exact component={RdsList} />
    <Route path={`${props.match.path}info`} exact component={RdsInfo} />
    <Resource match={props.match} />
    <Redirect to={`${props.match.url}`} />
  </RouteSwitch>
)

export default index