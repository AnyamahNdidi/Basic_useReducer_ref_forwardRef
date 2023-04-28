import React from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Login from './components/Login/Login'
import Home from "./components/Home/Home"
import AuthContext from './components/store/auth-context'

const App = () => {
    const { isLoggedIn} = React.useContext(AuthContext)


  return (
      <>
          
          <MainHeader />
        
          <main>
              {!isLoggedIn && <Login   /> }
              {isLoggedIn && <Home  /> }
              
              </main>
     
      </>
  )
}

export default App