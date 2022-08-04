import React from "react"
import { NativeBaseProvider } from "native-base"
import AuthProvider from "./src/contexts/auth.context"
import NavgiationView from "./src/views/core/navigation.view"

function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavgiationView />
      </AuthProvider>
    </NativeBaseProvider>
  )
}

export default App
