import {useAuth} from '../context/authContext'

export function Home() {
  const {user} = useAuth()
  const {usuario:{nombre}} = user
  const {token} = user
  return <div>Bienvenido {nombre} <br/> TU token es:{token}</div>
}