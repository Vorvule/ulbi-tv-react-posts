import React, { useContext } from 'react'
import But from '../components/ui/button/But'
import Inp from '../components/ui/input/Inp'
import { AuthContext } from '../context/context'

const Login = () => {

    const { setIsAuth } = useContext(AuthContext)


    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <Inp type='text' placeholder='Login' />
                <Inp type='password' placeholder='Password' />
                <But>Voetee</But>
            </form>
        </div>
    )
}

export default Login
