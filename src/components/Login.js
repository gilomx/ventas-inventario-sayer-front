import {useState} from 'react'
import { useAuth } from '../context/authContext'
import {useNavigate} from 'react-router-dom'
import logo from '../logo.svg'

export function Login() {

  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const {login} = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState();

  const handleChange = ({ target: { name, value }}) => {
    setUser({...user, [name]: value})
  }

  const handleSubmit = async(e) => {
    setError('')
    e.preventDefault();
    try{
        await login(user.email, user.password)
        navigate("/")
    }catch (error){
        console.log("Disparando error:")
        console.log(error)
        setError(error.toString())
    }
  }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-200'>
            <div className="px-4 py-6 mt-4 text-left bg-white shadow-lg min-w-[300px] rounded-lg">
            <img src={logo} alt="Logo" className='w-1/2 mx-auto mb-4'/>
            {error && <p>{error}</p>}
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className='text-gray-400'>Email</label>
                <input type="email" name="email" id="email" 
                className='block min-w-full bg-gray-100 rounded-lg mb-4 p-1.5' placeholder="Email" 
                    onChange={handleChange}
                />

                <label htmlFor="password" className='text-gray-400'>Password</label>
                <input type="password" name="password" id="password"
                className='block min-w-full bg-gray-100 rounded-lg mb-4 p-1.5' placeholder='******'
                onChange={handleChange}
                />

                <button className='bg-sky-500 text-white px-6 py-1.5 rounded-lg'>Login</button>
            </form>

            </div>
        </div>
    );
  }