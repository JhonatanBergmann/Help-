import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import HelpsMap from './pages/HelpsMap'
import Help from './pages/Help'
import CreateHelp from './pages/CreateHelp'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/app' component={HelpsMap} />

        <Route path='/helps/create' component={CreateHelp} />
        <Route path='/helps/:id' component={Help} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes