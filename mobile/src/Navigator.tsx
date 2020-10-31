import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const { Navigator, Screen } = createStackNavigator()

import Landing from './screens/Landing'
import HelpsMap from './screens/HelpsMap'
import HelpDetails from './screens/HelpDetails'
import SelectMapPosition from './screens/CreateHelp/SelectMapPosition'
import HelpData from './screens/CreateHelp/HelpData'

import StatusBarComp from './components/StatusBar'
import Header from './components/Header'

export default function Routes() {
  return (
   
    <NavigationContainer>
      <StatusBarComp />
      <Navigator screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#F2F3F5' } 
        }}>
        <Screen
          name='Landing'
          component={Landing}
        />
        <Screen
          name='HelpsMap'
          component={HelpsMap}
        />
        <Screen
          name='HelpDetails'
          component={HelpDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title='Helpe-me!' />
          }}  
        />
         <Screen
          name='SelectMapPosition'
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title='Selecione no mapa' />
          }}   
        />
         <Screen
          name='HelpData'
          component={HelpData}
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados' />
          }}   
        />
      </Navigator>
    </NavigationContainer>
  )
}