import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { Box, Button } from "native-base"
import altogic from "../configs/altogic"
import storage from "../configs/storage"
import _ from "lodash"
import { useAuthContext } from "../contexts/auth.context"
import helper from "../utils/helper"

function HomeView({ navigation, route }) {
  const [auth, setAuth] = useAuthContext()

  const signOut = async () => {
    if (!_.isNil(auth) && !_.isNil(auth.token)) {
      await altogic.auth.signOut(auth.token)
      setAuth(null)
      navigation.navigate("SignIn")
    }
  }

  const deleteUser = async () => {
    const id = _.get(auth, "_id")
    await altogic.endpoint.delete(`user/${id}`)
    setAuth(null)
    navigation.navigate("SignUp")
  }

  return (
    <View>
      <Text>Hello {_.get(auth, "token")}!</Text>
      <Box alignItems="center">
        <Button onPress={signOut}>Sign Out!</Button>
        <Button onPress={deleteUser}>Delete!</Button>
      </Box>
    </View>
  )
}

export default HomeView
