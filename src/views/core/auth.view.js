import _ from "lodash"
import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { useAuthContext } from "../../contexts/auth.context"
import altogic from "../../configs/altogic"

function AuthView({ children, route, navigation }) {
  const [auth, setAuth, isAuthLoading] = useAuthContext()
  const authToken = _.get(auth, "token")
  const paramToken = _.get(route, "params.token")

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!_.isNil(paramToken) && _.isNil(authToken)) {
      handleToken()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (_.isNil(paramToken) && !isAuthLoading && _.isNil(authToken)) {
      navigation.navigate("SignIn")
    }
  }, [isAuthLoading, authToken])

  const handleToken = async () => {
    setLoading(true)
    const { user, session } = await altogic.auth.getAuthGrant(
      paramToken
    )

    if (!_.isNil(session) && !_.isNil(user)) {
      setAuth({
        ...user,
        token: session.token
      })
    }
    setLoading(false)
  }

  return (
    <View>
      {isLoading || isAuthLoading ? (
        <Text>Loading...</Text>
      ) : authToken ? (
        children
      ) : (
        <Text>
          You do not have permission to access this page. Please login
        </Text>
      )}
    </View>
  )
}

export default AuthView
