import {useEffect, useState} from 'react'
import {createContext, useContext} from 'react';
import axios from 'axios'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error('There is not auth provider')
    return context
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const userStorage = localStorage.getItem('user');
        if(userStorage){
            setUser(JSON.parse(userStorage))
            setLoading(false)
            return
        }
        setUser(null)
        setLoading(false)
    },[])

    

    const login = async(email, password) => {
        // console.log('intentando login')
        const {data} = await axios.post(`http://localhost:3000/api/auth/login`,{
            email,
            password}).catch((error) => {
                console.log(error.response)
                throw new Error(error.response.data.msg)
            })
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
    }

    return (
        <authContext.Provider value ={{login, user, loading }}>
            {children}
        </authContext.Provider>
    )
}