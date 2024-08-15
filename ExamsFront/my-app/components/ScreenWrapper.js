import { View, StatusBar } from 'react-native'
import React from 'react'

export default function ScreenWrapper({children}) {
    let StatusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight : 30;
  return (
    <View style={{paddingTop: StatusBarHeight}}>
        {children}
    </View>
  )
}