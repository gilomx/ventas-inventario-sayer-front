import {useState} from 'react'
import { useAuth } from '../context/authContext'
import {useNavigate} from 'react-router-dom'


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
        <div>
            {error && <p>{error}</p>}
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className='block' placeholder="hola@mail.com" 
                    onChange={handleChange}
                />

                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" className='block'
                onChange={handleChange}
                />

                <button>Login</button>
            </form>
        </div>
    );
  }