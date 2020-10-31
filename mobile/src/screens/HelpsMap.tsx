import React, { useState } from 'react'
import { 
  StyleSheet, 
  View,
  Text, 
  Dimensions,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import mapMarker from '../imgs/map-marker.png'

import api from '../services/api'

interface Help {
  id: number
  name: string
  latitude: number
  longitude: number
}

export default function HelpsMap() {
  const [helps, setHelps] = useState<Help[]>([])
  const navigation = useNavigation()

  useFocusEffect(() => {
    api.get('helps').then(response => {
      setHelps(response.data)
    })
  })

  function handleNavigationToHelpDetails(id: number) {
    navigation.navigate('HelpDetails', { id })
  }

  function handleNavigationToCreateHelp() {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -30.0309499,
          longitude: -51.2279973,
          latitudeDelta: 0.008,
          longitudeDelta:  0.008
        }}>
         {helps.map(help => {
           return (
            <Marker
              key={help.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.8,
                y: 0.8
            }}
            coordinate={{
              latitude: help.latitude,
              longitude: help.longitude
          }}>
            <Callout onPress={() => handleNavigationToHelpDetails(help.id)} tooltip={true}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{help.name}</Text>
              </View>
            </Callout>
          </Marker>
           )
         })}
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{helps.length} Pessoa(s) precisando de ajuda</Text>
          <RectButton style={styles.createHelpButton} onPress={handleNavigationToCreateHelp}>
            <Feather name='plus' size={20} color='#FFF' />
          </RectButton>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    justifyContent: 'center',
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16
  },
  calloutText : {
    fontFamily: 'Nunito_700Bold',
    color: '#213f7a',
    fontSize: 14
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 24,
    right: 24,
    top: 55,
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    elevation: 3
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#9080a4'
  },
  createHelpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#213f7a',
    borderRadius: 20
  }
})