import React,{useState, useReducer, useContext, useRef, useEffect} from 'react'
import style from "./Login.module.css"
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import { type } from '@testing-library/user-event/dist/type'
import AuthContext from '../store/auth-context'
import Input from '../UI/Input/Input'


const emailReducer = (state, action) => {

  
    
    if (action.type === "USER_INPUT")
    {
        return {enteredEmail:action.payload, emailIsValid:action.payload.includes('@')} 
    }
    if (action.type === "INPUT_BLUR")
    {
        return {enteredEmail:state.enteredEmail, emailIsValid:state.enteredEmail.includes("@")}
    }
    return {enteredEmail:"", emailIsValid:null}
}


const passwordReducer = (state, action) => {
    if (action.type === "PASSWORD_INPUT")
    {
         return { enteredPassword: action.payload, passwordIsValid:action.payload.trim().length > 6}
    }
    if (action.type === "PASSWORD_BLUR")
    {
        return { enteredPassword: state.enteredPassword, passwordIsValid:state.enteredPassword.trim().length > 6}
    }
    return { enteredPassword: "", passwordIsValid:null}
}

const Login = (props) => {
  
    const [formIsValid, setFormIsValid] = useState(false);
    const { isLogIn } = React.useContext(AuthContext)
    
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    
    // using useReducer for the two state below
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailisValid] = useState()
 
      // using useReducer for the two state below
    // const [enteredPassword, setEnteredPasswrod] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState()

    const intialState = {
        enteredEmail: "",
        emailIsValid: null,
    }

    const passSatate = {
        enteredPassword: "",
        passwordIsValid:null
    }
    const [dataEmailisValid, dispatchData] = useReducer(emailReducer, intialState)
    const [dataPasswordIsValid, dispatchPasswordData] = useReducer(passwordReducer, passSatate)

    
    const {emailIsValid} = dataEmailisValid
    const {passwordIsValid} = dataPasswordIsValid
    React.useEffect(() => {

     const identifier= setTimeout(() => {
             console.log("checking for validation")
         setFormIsValid(
            dataEmailisValid.emailIsValid && dataPasswordIsValid.passwordIsValid
        )
        }, 500)

        return () => {
            console.log("clean up")
            clearInterval(identifier)
        }
       
    },[emailIsValid, passwordIsValid])

    const emailChangeHandler = (e) => {
        dispatchData({
            type: "USER_INPUT",
            payload:e.target.value
        })

        setFormIsValid(
            e.target.value.includes('@') && dataPasswordIsValid.passwordIsValid
        )

      
    }

    const passwordChangeHandler = (e) => {
        dispatchPasswordData({
            type: "PASSWORD_INPUT",
            payload:e.target.value
        })
         
        setFormIsValid(
          dataEmailisValid.emailIsValid && e.target.value.trim().length > 6 
        )
    }

    const emailValidHandler = () => {
        dispatchData({type:"INPUT_BLUR"})
        // setEmailisValid(dataEmailisValid.emailisValid)
    }

    const passwordValidHandler = () => {
        dispatchPasswordData({type:"PASSWORD_BLUR"})
        // setPasswordIsValid(dataPasswordIsValid.passwordIsValid)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formIsValid)
        {
            isLogIn(dataEmailisValid.enteredEmail, dataPasswordIsValid.enteredPassword)
        } else if(!emailIsValid)
        {
            //.foucs coming from input component useImperativeHandle  return focus
            emailInputRef.current.focus()
            
        }else {
            passwordInputRef.current.focus()
        }
        
    }

  return (
      <Card className={style.login}>
          <form onSubmit={handleSubmit}>
              <Input
                  
                  ref={emailInputRef}
                  id="email"
                  label="E-mail"
                  type="email"
                  isValid={emailIsValid}
                  value={dataEmailisValid.enteredEmail}
                  onChange={emailChangeHandler}
                  onBlur={emailValidHandler}
              />
              <Input
                  ref={passwordInputRef}
                  id="password"
                  label="Password"
                  type="password"
                  isValid={passwordIsValid}
                  value={dataPasswordIsValid.enteredPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordValidHandler}
              />
             
              <div className={`${style.actions}`} >
                  <Button  type="submit" >
                      Login
                  </Button>
               
              </div>
          </form>
      </Card>
  )
}

export default Login

// disabled={!formIsValid}