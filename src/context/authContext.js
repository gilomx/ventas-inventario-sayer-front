import {useState} from 'react'
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

    const login = async(email, password) => {
        console.log('intentando login')
        const response = await axios.post(`http://localhost:3000/api/auth/login`,{
            correo: email,
            password}).catch((error) => {
                console.log(error.response)
                throw new Error(error.response.data.msg)
            })
        console.log('Response:')
        console.log(response);
    }

    

    return (
        <authContext.Provider value ={{login}}>
            {children}
        </authContext.Provider>
    )
}