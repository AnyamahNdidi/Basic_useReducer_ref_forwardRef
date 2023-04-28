import react,{useEffect} from "react"

const AuthContext = react.createContext({
    isLoggedIn: false,
    onLogOut: () => { },
    isLogIn: (email, password) =>{}
})

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = react.useState(false)
    
    const LogOutHandler = () => {
        localStorage.removeItem("isLogin")
        setIsLoggedIn(false)
    }

    const LogInHandler = () => {
        localStorage.setItem("isLogin", "1")
        setIsLoggedIn(true)
    }

    useEffect(() => {
        const storageUserLoginInformation = localStorage.getItem("isLogin")
        if (storageUserLoginInformation === "1")
        {
           setIsLoggedIn(true) 
        }
    }, [])
    
    return <AuthContext.Provider value={{
         isLoggedIn:isLoggedIn,
        onLogOut: LogOutHandler,
        isLogIn: LogInHandler
    }}
       

    >{children}</AuthContext.Provider>
}

export default AuthContext

