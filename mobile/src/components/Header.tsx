import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

interface HeaderProps {
  title: string
  showCancel?: boolean
}

export default function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation()

  function handleGoBackToHomePage() {
    navigation.navigate('HelpsMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name='arrow-left' size={24} color='#0e3279' />
      </BorderlessButton>

      <Text style={styles.title} >{title}</Text>

     { showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomePage}>
          <Feather name='x' size={24} color='#971e3d' />
        </BorderlessButton>
     ) : (
       <View />
     ) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 44,
    backgroundColor: '#F9FAFC',
    borderBottomWidth: 1,
    borderColor: '#DDE3F0',
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#213f7a',
    fontSize: 16
  }
})