import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenu from './src/components/Menus/ScreenMenu'
import { PostProvider } from './context/postContext'

const RootNavigation = () => {
  return (
       <AuthProvider>
        <PostProvider>
        <ScreenMenu />
        </PostProvider>
       </AuthProvider>
  )
}

export default RootNavigation

