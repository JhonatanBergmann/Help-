import React, { useState } from 'react'
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Text 
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'
import MapView, { Marker, MapEvent } from 'react-native-maps'

import mapMarkerImg from '../../imgs/map-marker.png'

export default function SelectMapPosition() {
  const navigation = useNavigation()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})

  function handleNextStep() {
    navigation.navigate('HelpData', { position })
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        onPress={handleSelectMapPosition}
        initialRegion={{
          latitude: -30.0309499,
          longitude: -51.2279973,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        { position.latitude != 0 && (
          <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />
        )}
      </MapView>

      { position.latitude != 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  nextButton: {
    backgroundColor: '#213f7a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF'
  }
})