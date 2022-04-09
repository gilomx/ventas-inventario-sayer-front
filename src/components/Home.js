import {useAuth} from '../context/authContext'

export function Home() {
  const {user, token} = useAuth()
  return <div>Bienvenido {user.nombre} <br/> TU token es:{token}</div>
}