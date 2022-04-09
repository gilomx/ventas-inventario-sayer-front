import {useEffect, useState} from 'react'
import {createContext, useContext} from 'react';
import axios from 'axios'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error('There is not auth provider')
    return context
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        if(!token){
            setLoading(false)
            return
        }
    })
    

    const login = async(email, password) => {
        // console.log('intentando login')
        const {data} = await axios.post(`http://localhost:3000/api/auth/login`,{
            correo: email,
            password}).catch((error) => {
                console.log(error.response)
                throw new Error(error.response.data.msg)
            })
        setUser(data.usuario)
        setToken(data.token)
        // console.log('Response:')
        // console.log(user)
        // console.log('token:')
        // console.log(token)
    }

    

    return (
        <authContext.Provider value ={{login, user, token }}>
            {children}
        </authContext.Provider>
    )
}