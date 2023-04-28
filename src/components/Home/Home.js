import React from 'react'
import style from "./home.module.css"
import Card from "../UI/Card/Card"

const Home = () => {
  return (
      <Card
          className={style.home}
      >Welcome User</Card>
  )
}

export default Home