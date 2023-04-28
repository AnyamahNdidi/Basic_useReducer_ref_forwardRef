import React from 'react'
import style from "./Mainheader.module.css"
import Navigation from './Navigation'

const MainHeader = (props) => {
  return (
      <header className={`${style["main-header"]}`}>
          <h1>jPot</h1>
          <Navigation  onLogOut={props.onLogOut} />
      </header>
  )
}

export default MainHeader