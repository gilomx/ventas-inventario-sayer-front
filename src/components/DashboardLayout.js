import NavBar from "./NavBar"
import {useAuth} from '../context/authContext'

export const DashboardLayout = ({children}) => {
    const {user} = useAuth()
    const {user:{name}} = user
    // console.log(name)
    // const {token} = user
    return (
        <div className='flex flex-nowrap items-stretch bg-gray-200'>
        {/* Inicia NavBar */}
        <NavBar/>
        {/* Fin NavBar */}
        <div className='flex flex-col w-full bg-gray-100'>
            {/* Top Bar */}
            <div className='bg-sky-600 p-2.5 text-white text-right'> hola {name}</div>
            {children}
        </div>
        
        {/* <div>Bienvenido {nombre} <br/> TU token es:{token}</div> */}
        </div>
    )
}