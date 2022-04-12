import logo from '../logo.svg'
import {NavLink} from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex flex-col w-80 h-screen bg-gray-200 drop-shadow-md'>
        <div className='my-6 ml-8'>
            <NavLink to='/'><img src={logo} alt="Logo" className='w-2/3'/></NavLink>
        </div > 
        <div className='my-4 ml-8' >
          <NavLink to='/'
            className={({ isActive }) =>
            isActive ? 'text-xl text-sky-500 font-medium' : 'text-xl text-gray-500'
            }>
              Inicio
          </NavLink>
        </div>
        <div className='mb-4 ml-8' >
          <NavLink to='/productos' className='text-xl text-gray-500 hover:text-xl hover:text-sky-500 hover:font-medium'>Productos</NavLink>
        </div>
        <div className='mb-4 ml-8' >
          <NavLink to='/productos' className='text-xl text-gray-500 hover:text-xl hover:text-sky-500 hover:font-medium'>Productos</NavLink>
        </div>
        <div className='mb-4 ml-8' >
          <NavLink to='/productos' className='text-xl text-gray-500 hover:text-xl hover:text-sky-500 hover:font-medium'>Productos</NavLink>
        </div>
        <div className='mb-4 ml-8' >
          <NavLink to='/productos' className='text-xl text-gray-500 hover:text-xl hover:text-sky-500 hover:font-medium'>Productos</NavLink>
        </div>
      </div>
  )
}

export default NavBar
