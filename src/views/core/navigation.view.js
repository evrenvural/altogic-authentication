import React from "react"
import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignUpView from "../signUp.view"
import SignInView from "../signIn.view"
import HomeView from "../home.view"
import { useAuthContext } from "../../contexts/auth.context"
import _ from "lodash"
import helper from "../../utils/helper"
import AuthView from "./auth.view"

const Stack = createNativeStackNavigator()

const config = {
  screens: {
    Home: "home/:token?",
    SignIn: "sign-in",
    SignUp: "sign-up"
  }
}

const linking = {
  prefixes: ["myapp://"],
  config
}

function NavgiationView(navParam) {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <AuthView {...props}>
              <HomeView {...props} />
            </AuthView>
          )}
        </Stack.Screen>
        <Stack.Screen name="SignIn" component={SignInView} />
        <Stack.Screen name="SignUp" component={SignUpView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavgiationView
