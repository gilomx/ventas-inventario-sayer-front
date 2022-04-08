import {useState} from 'react'

export function Register() {

  const [user, setUser] = useState({
    email:'',
    password:'',
  })

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(user)
  }
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className='block' placeholder="hola@mail.com" 
          onChange={handleChange}
        />

        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" className='block'
          onChange={handleChange}
        />

        <button>Registrar</button>
      </form>
    )
  }