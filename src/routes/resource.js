import React from 'react'
import {
  Route,
  Switch as RouteSwitch,
  Redirect
} from 'react-router-dom'

import Server from '../containers/admin/resource/server'
import ServerEdit from '../containers/admin/resource/server/edit'
import IDC from '../containers/admin/resource/idc'
import IDCEdit from '../containers/admin/resource/idc/edit'

const resource = (props) => (
  <div>
    <Route path={`${props.match.path}server`} exact component={Server} />
    <Route path={`${props.match.path}server/edit`} exact component={ServerEdit} />
    <Route path={`${props.match.path}idc`} exact component={IDC} />
    <Route path={`${props.match.path}idc/edit`} exact component={IDCEdit} />
  </div>
)

export default resource