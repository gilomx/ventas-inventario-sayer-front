import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


export const Productos = () => {
    // Ejemplo de producto
    // "productCode": "VG-0200.10",
	// "name": "Cuarto vinílica magicolor blanco",
	// "category": {
	// 	"_id": "62644b64fcc1cd1595e6bbcd",
	// 	"name": "Vinílica Magicolor",
	// 	"status": true,
	// 	"__v": 0
	// },
	// "purchasePrice": "18.29",
	// "salePrice": "19.29",
	// "description": "Pintura para casa 4 años de duración",
	// "uid": "62644199a6caff3e9e604b87"

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(()=>{
        const products = getProducts()
        if(products){
            setLoading(false)
            return
        }
        setLoading(true)
    },[])

    const getProducts = async() => {
        // console.log('intentando login')
        const {data} = await axios.get(`http://localhost:3000/api/productos`)
        .catch((error) => {
                console.log(error.response)
                throw new Error(error.response.data.msg)
            })
        setProducts(data.products)
        console.log("Productos:")
        console.log(products)
    }

    const handleButton = (e) => {
        e.preventDefault()
        navigate("agregar")
    }


    // const TableItems = (products) => {
    //     products.map((product,key) => (
    //         <tr key={key}>
    //             <td>{product.productCode}</td>
    //             <td>{product.name}</td>
    //             <td>{product.category.name}</td>
    //             <td>{product.purchasePrice}</td>
    //             <td>{product.salePrice}</td>
    //         </tr>
    //     ))
    // }

    return (
      <>
          <div className='flex flex-nowrap justify-between p-12'>
            <form>
              <input type="text" name="buscar" id="buscar" 
                    className='block w-96 bg-white rounded-lg 
                      p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400'
                    placeholder='Buscar'
              />
            </form>
            <button
                onClick={handleButton} 
                className='bg-sky-600 text-white px-6 p-1.5 rounded-lg hover:bg-sky-500'>Agregar nuevo</button>
          </div>
          <div className='box-content p-2 mx-12 rounded-lg bg-white drop-shadow-sm'>
            {loading === true &&
                <h1>Loading</h1>
            }

            {loading === false &&
            <table className="table-auto w-full">
                <thead>
                    <tr className='text-left text-xs text-gray-500 pb-2'>
                        <th className='font-normal pb-3'>Código</th>
                        <th className='font-normal pb-3'>Nombre</th>
                        <th className='font-normal pb-3'>Categoría</th>
                        <th className='font-normal pb-3'>Costo</th>
                        <th className='font-normal pb-3'>Precio</th>
                        <th className='font-normal pb-3'>acciones*</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,key) => (
                        <tr className='text-left text-base text-gray-500' key={key}>
                            <td className='pb-3 font-normal'>{product.productCode}</td>
                            <td className='pb-3 font-normal'>{product.name}</td>
                            <td className='pb-3 font-normal'>{product.category.name}</td>
                            <td className='pb-3 font-normal'>{product.purchasePrice}</td>
                            <td className='pb-3 font-normal'>{product.salePrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
          </div> 
      </>
      )
  }