import {useAuth} from '../context/authContext'
import NavBar from '../components/NavBar'

export function Home() {
  const {user} = useAuth()
  const {usuario:{nombre}} = user
  // const {token} = user
  return (
    <div className='flex flex-nowrap items-stretch bg-gray-200'>
      {/* Inicia NavBar */}
      <NavBar/>
      {/* Fin NavBar */}
      <div className='flex flex-col w-full bg-gray-100'>
        <div className='bg-sky-600 p-2.5 text-white text-right'> hola {nombre}</div>
        <div className='flex flex-nowrap justify-between p-12'>
          <form>
            <input type="text" name="email" id="email" 
                  className='block w-96 bg-white rounded-lg 
                    p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400'
                  placeholder='Buscar'
            />
          </form>
          <button className='bg-sky-600 text-white px-6 p-1.5 rounded-lg hover:bg-sky-500'>Agregar nuevo</button>
        </div>
        <div className='box-content p-2 mx-12 rounded-lg bg-white drop-shadow-sm'>
          algo<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
      </div>
      
      {/* <div>Bienvenido {nombre} <br/> TU token es:{token}</div> */}
    </div>
    
    )
}