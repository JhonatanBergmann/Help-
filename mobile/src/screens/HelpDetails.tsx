import React, { useEffect, useState } from 'react'
import { 
  Image, 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { useRoute } from '@react-navigation/native'

import mapMarkerImg from '../imgs/map-marker.png'

import api from '../services/api'

interface HelpDetailsRouteParams {
  id: number
}

interface Help {
  id: number
  name: string
  latitude: number  
  longitude: number
  about: string
  images: Array<{
    id: number
    url: string
  }>
}

export default function HelpDetails() {
  const route = useRoute()
  const [help, setHelp] = useState<Help>()

  const params = route.params as HelpDetailsRouteParams

  useEffect(() => {
    api.get(`helps/${params.id}`).then(response => {
      setHelp(response.data)
    })
  }, [params.id])

  if (!help) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    )
  }

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${help?.latitude},${help?.longitude}`)
  }
  
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {help.images.map(image => {
            return (
              <Image style={styles.image}
                key={image.id} 
                source={{ uri: image.url }} 
              />
            )
          })}
        </ScrollView>
      </View> */}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{help.name}</Text>
        <Text style={styles.description}>
          {help.about}
        </Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: help.latitude,
              longitude: help.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: help.latitude,
                longitude: help.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity style={styles.routesContainer}
            onPress={handleOpenGoogleMapsRoutes}  
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagesContainer: {
    height: 240
  },
  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover'
  },
  detailsContainer: {
    padding: 24
  },
  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold'
  },
  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB'
  },
  mapStyle: {
    width: '100%',
    height: 150
  },
  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },
  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40
  },
/*  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40
  },
  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16
  } */
})