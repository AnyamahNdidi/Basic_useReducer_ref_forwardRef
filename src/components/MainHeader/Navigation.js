import React from 'react'
import style from "./Navigation.module.css"
import AuthContext from '../store/auth-context'
const Navigation = () => {
    const ctx = React.useContext(AuthContext)
    return (
     
                        <nav className={`${style["nav"]}`}>
                            <ul>
                                {
                                    ctx.isLoggedIn &&  
                                (    <li>
                                    <a href="/">User</a>
                                </li>)
                                }

                                {
                                    ctx.isLoggedIn &&  
                                (   <li>
                                    <a href="/">Admin</a>
                                </li>)
                                }
                                {
                                    ctx.isLoggedIn &&  
                                (   <li>
                                    <button  onClick={ctx.onLogOut}>Log Out</button>
                                </li>)
                                }
                                
                                
                                
                            </ul>
                        </nav>
             
 
  )
}

export default Navigation