import React, { useState } from "react"
import { Input, Icon, Stack, Box, Button } from "native-base"
import altogic from "../configs/altogic"
import helper from "../utils/helper"
import _ from "lodash"
import { useAuthContext } from "../contexts/auth.context"

function SignInView({ navigation }) {
  const [auth, setAuth] = useAuthContext()

  const [show, setShow] = useState(false)

  const [inpEmail, setInpEmail] = useState("")
  const [inpPassword, setInpPassword] = useState("")

  const goSignUp = async () => {
    navigation.navigate("SignUp")
  }

  const signIn = async () => {
    const { user, session, errors } =
      await altogic.auth.signInWithEmail(inpEmail, inpPassword)

    if (!_.isNil(session) && !_.isNil(user)) {
      setAuth({
        ...user,
        token: session.token
      })
      navigation.navigate("Home")
    } else if (errors) {
      helper.log({ errors })
    }
  }

  return (
    <Stack space={4} w="100%" alignItems="center">
      <Input
        w={{
          base: "75%",
          md: "25%"
        }}
        InputLeftElement={
          <Icon
            ios="ios-menu"
            android="md-menu"
            style={{ fontSize: 20, color: "red" }}
          />
        }
        placeholder="E-Mail"
        onChangeText={setInpEmail}
      />
      <Input
        w={{
          base: "75%",
          md: "25%"
        }}
        type={show ? "text" : "password"}
        InputRightElement={
          <Icon
            size={5}
            mr="2"
            color="muted.400"
            onPress={() => setShow(!show)}
          />
        }
        placeholder="Password"
        onChangeText={setInpPassword}
      />
      <Box alignItems="center">
        <Button onPress={signIn}>Sign In</Button>
        <Button onPress={goSignUp}>Sign Up</Button>
      </Box>
    </Stack>
  )
}

export default SignInView
