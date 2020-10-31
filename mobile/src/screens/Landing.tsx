import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Home(){

  const navigation = useNavigation()

  function handleNavigationToHelpsMap() {
    navigation.navigate('HelpsMap')
  }
    return (
      <View style={styles.container}>
        <LinearGradient style={styles.gradient}
          colors={['#D0E0F9', '#A3C5F8', '#70a6f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContainer}>
            <Image style={styles.logoImage} 
              source={require('../imgs/logo.png')}
            />
            <Text style={styles.title}>Porto Alegre{'\n'}RS</Text>
          </View>

          <View style={styles.mainContainer}>
            <Text style={[styles.title, {fontSize: 45}]}>
              Ajude{'\n'}pessoas{'\n'}em{'\n'}situação{'\n'}de rua</Text>
            <Image style={styles.landingImage}
            source={require('../imgs/landing.png')}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={[styles.title, { bottom: 50 ,fontSize: 20, fontFamily: 'Nunito_600SemiBold'}]}>
                Ajude alguém e deixe esse dia{'\n'}mais feliz para todos.</Text>
            <RectButton style={styles.ToHelpsMapButton} onPress={handleNavigationToHelpsMap}>
              <Feather name='arrow-right' size={25} color='#FFF' />
            </RectButton>
          </View>
        </LinearGradient>
      </View>
    )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  gradient: {
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logoImage: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 20
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    color: '#FFF',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  landingImage: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 5
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  ToHelpsMapButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    height: 76,
    backgroundColor: '#213f7a',
    borderRadius: 25
  }
})