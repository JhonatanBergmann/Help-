import React, { Component } from 'react'
import {
    StatusBar, 
    View
} from 'react-native'

class StatusBarComp extends Component {
    render() {
        return (
            <View>
                <StatusBar
                    barStyle='light-content'
                    hidden={true}
                    backgroundColor='#000' />
             </View>
        )
    }
}

export default StatusBarComp