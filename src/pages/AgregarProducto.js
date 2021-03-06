import {useAuth} from '../context/authContext'
import {useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import { XCircleIcon, ArrowLeftIcon } from '@heroicons/react/solid'
import Loader from '../components/Loader'

export const AgregarProducto = () => {

    const {user} = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        productCode:'',
        purchasePrice:'',
        salePrice:'',
        category:'',
        name:'',
        description:''
    })
    
    const [searchTerm, setSearchTerm] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [errors, setErrors] = useState({
        productCode:'',
        purchasePrice:'',
        salePrice:'',
        category:'',
        name:''
    })
    // const [categories, setCategories] = useState([])
    const [suggestions, setSuggestions] = useState({
        activeSuggestion: -1,
        filteredSuggestions:[],
        activeSuggestionUid: '',
        activeSuggestionName:'',
        selectedCategory:'',
        isSelected: false,
        isLoading: false,
        suggestionExists: false
    })

    const categoryInput = useRef(null)
    const firstRender = useRef(true);

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false
        }
        if(!suggestions.isSelected && categoryInput && firstRender.current===false){
            categoryInput.current.focus()
        }
    },[suggestions])

    const addCategory = async(name) => {
        const options ={
            headers:{
                'x-token': user.token
            }
        }
        console.log('Options')
        console.log(options)
        // const {data:{categories}}
        const {data} = await axios.post(`http://localhost:3000/api/categorias`,{
            "name": name
        }, options)
        console.log('Category created:')
        console.log(data)

        return data
    }

    const searchCategories = async(busqueda) => {
        // console.log('intentando login')
        const {data:{categories}} = await axios.post(`http://localhost:3000/api/categorias/search`,{
            "busqueda": busqueda
        },)
        console.log("busqueda")
        console.log(busqueda)
        console.log("Peticion:")
        console.log(categories)
        return categories
        // setSearchResult(data)
    }

    const handleChange = ({ target: { name, value }}) => {
        //Limpiar error visual
        const domEl = document.querySelector(`#${name}`)
        domEl.classList.remove('border', 'border-red-500')
        setErrors({
            ...errors,
            [name]:''
        })

        name === 'productCode' ? setForm({...form, [name]: value.toUpperCase()}) : setForm({...form, [name]: value})
        console.log('Form:')
        console.log(form)
    }

    const handleClickCategory = async(key) => {
        // alert('Mouse Enter ' + key)
        if(key===suggestions.filteredSuggestions.lenght){
            console.log('Click en crear')
            
            setSuggestions({
                ...suggestions,
                isLoading:true
            })
            const category = await addCategory(searchTerm)
            console.log(category)
            setForm({
                ...form,
                category: category.uid
            })
            setSuggestions({
                ...suggestions,
                filteredSuggestions:[],
                activeSuggestionUid: '',
                activeSuggestionName:'',
                selectedCategory: category.name,
                isSelected: true,
                isLoading:false
            })
        }
        else{
            setSuggestions({
                ...suggestions,
                filteredSuggestions:[],
                activeSuggestionUid: '',
                activeSuggestionName:'',
                selectedCategory: suggestions.filteredSuggestions[key].name,
                isSelected: true
            })
            setForm({
                ...form,
                category: suggestions.filteredSuggestions[key].uid
            })
        }

    }

    const handleKeyDown = async(e) => {
        //Enter Key
        if(e.key==='Enter'){
            // e.preventDefault()
            // alert('Enter')
            if(suggestions.activeSuggestion===suggestions.filteredSuggestions.length){
                setSuggestions({
                    ...suggestions,
                    isLoading:true
                })

                const category = await addCategory(searchTerm)
                setForm({
                    ...form,
                    category: category.uid
                })
                setSuggestions({
                    ...suggestions,
                    filteredSuggestions:[],
                    activeSuggestionUid: '',
                    activeSuggestionName:'',
                    selectedCategory: category.name,
                    isSelected: true,
                    isLoading:false
                })
            }else if(suggestions.activeSuggestion!==-1){       
                setForm({
                    ...form,
                    category: suggestions.activeSuggestionUid
                })
                setSuggestions({
                    ...suggestions,
                    filteredSuggestions:[],
                    activeSuggestionUid: '',
                    activeSuggestionName:'',
                    selectedCategory: suggestions.activeSuggestionName,
                    isSelected: true
                })
            }
        }
        //Arrow Up
        if(e.keyCode===38 && suggestions.filteredSuggestions.length !== 0){
            e.preventDefault()
            
            if(suggestions.activeSuggestion>0){
                setSuggestions({
                    ...suggestions,
                    activeSuggestion: suggestions.activeSuggestion-1,
                    activeSuggestionName: suggestions.filteredSuggestions[suggestions.activeSuggestion-1].name,
                    activeSuggestionUid: suggestions.filteredSuggestions[suggestions.activeSuggestion-1].uid
                })
                document.getElementById("category").value = suggestions.filteredSuggestions[suggestions.activeSuggestion-1].name
                console.log(suggestions)
            }
        }
        //ArrowDown
        if(e.keyCode===40 || e.keyCode===9){
            e.preventDefault()

            if(suggestions.activeSuggestion<suggestions.filteredSuggestions.length-1){
                setSuggestions({
                    ...suggestions,
                    activeSuggestion: suggestions.activeSuggestion+1,
                    activeSuggestionName: suggestions.filteredSuggestions[suggestions.activeSuggestion+1].name,
                    activeSuggestionUid: suggestions.filteredSuggestions[suggestions.activeSuggestion+1].uid
                })
                document.getElementById("category").value = suggestions.filteredSuggestions[suggestions.activeSuggestion+1].name
            }
            if(suggestions.activeSuggestion===suggestions.filteredSuggestions.length-1 && !suggestions.suggestionExists){
                setSuggestions({
                    ...suggestions,
                    activeSuggestion: suggestions.activeSuggestion+1,
                    activeSuggestionName:'',
                    activeSuggestionUid:''
                })
                document.getElementById("category").value = searchTerm
            }
            if(!suggestions.filteredSuggestions.length){
                e.preventDefault()
                setSuggestions({
                    ...suggestions,
                    activeSuggestion: 0,
                })
            }
            console.log("activeSuggestion:")
            console.log(suggestions.activeSuggestion)
        }
    }

    const handleCategory = async(e) => {
        e.preventDefault()
        setErrors({
            ...errors,
            category:''
        })

        setSearchTerm(e.target.value)
        setSuggestions({
            ...suggestions,
            activeSuggestion: -1
        })
        const categories = await searchCategories(e.target.value.trim())

        //Verificar si lo escrito existe
        const searchTermExists = categories.some(element => element.name.toLowerCase().trim() === e.target.value.toLowerCase().trim() )
        console.log('Comparando si existe')
        console.log(searchTermExists)
        
        if(searchTermExists){
            setSuggestions({
                ...suggestions,
                filteredSuggestions: categories,
                isSelected: false,
                isLoading: false,
                suggestionExists: searchTermExists,
                activeSuggestion: 0,
                activeSuggestionName: categories[0].name,
                activeSuggestionUid: categories[0].uid
            })
        }else {
            setSuggestions({
                ...suggestions,
                filteredSuggestions: categories,
                activeSuggestion: -1,
                isSelected: false,
                isLoading: false,
                suggestionExists: searchTermExists
            })
        }

    }

    const clearCategory = () => {
        setSuggestions({
            activeSuggestion: -1,
            filteredSuggestions:[],
            activeSuggestionUid: '',
            activeSuggestionName:'',
            selectedCategory:'',
            isSelected: false,
            isLoading: false,
            suggestionExists: false
        })
        setForm({
            ...form,
            category:''
        })
        setSearchTerm('')
    }

    const ErrorShow = (props) => {
        const error = props.error
        return error.split('\n').map(error => <p>{error}</p>);
    }

    const addProduct = async(req) => {
        const options ={
            headers:{
                'x-token': user.token
            }
        }
        setIsSending(true)
        console.log('Options')
        console.log(options)
        // const {data:{categories}}
        try {
            await axios.post(`http://localhost:3000/api/productos`, req, options)
            navigate("/productos")
        } catch(error) {
            // setErrors(error.response.data.errors)
            setIsSending(false)
            let errorObject = {
                productCode:'',
                purchasePrice:'',
                salePrice:'',
                category:'',
                name:''
            }

            error.response.data.errors.forEach((element) => {
                
                errorObject = {
                    ...errorObject,
                    [element.param]: errorObject[element.param] + element.msg + `\n`
                }
                const domEl = document.querySelector(`#${element.param}`)
                domEl.classList.add('border', 'border-red-500')
                
            })
            setErrors({
                ...errorObject
            })
            console.log(error.response.data.errors)
            console.log('Objeeto error')
            console.log(errorObject)
        }
        return 
    }

    const handleForm = async(e) => {
        e.preventDefault()
        addProduct(form)
        // formValidation(form)
        // const product = await addProduct(form)
    }

    return (
        <div className='box-content relative p-2 m-12 rounded-lg bg-white drop-shadow-sm'>
            {isSending &&
                <div className='absolute z-10 m-0 m-auto top-0 bottom-0 opacity-60 right-0 left-0 bg-gray-200 rounded-lg'>
                    <Loader className='m-auto'/>
                </div>
            }
            <h1 className="text-xl my-3 mx-2">
                <ArrowLeftIcon 
                    onClick={() => navigate('/productos')} 
                    className='w-6 mr-2 text-gray-500 inline cursor-pointer hover:text-sky-600'/>
                Agregar producto
            </h1>
            <form onSubmit={handleForm}>
                <div className="flex flex-auto">
                    <div className="flex-1 p-2">
                        <div className='inputContainer mb-4'>

                            <label htmlFor="productCode" className='text-gray-400'>C??digo</label>
                            <input onChange={handleChange} type="text" name="productCode" id="productCode" 
                            className='block min-w-full bg-gray-100 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200' 
                            value={form.productCode}
                            />
                            {errors.productCode &&
                                <div className='text-red-500 text-sm'>
                                    <ErrorShow error={errors.productCode}/>
                                </div>
                            }
                        
                        </div>
                        <div className='inputContainer mb-4'>
                            <label htmlFor="name" className='text-gray-400'>Nombre</label>
                            <input onChange={handleChange} type="text" name="name" id="name"
                            className='block min-w-full bg-gray-100 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200'
                            
                            />
                            {errors.name &&
                                <div className='text-red-500 text-sm'>
                                    <ErrorShow error={errors.name}/>
                                </div>
                            }
                        </div>
                        <div className='inputContainer mb-4'>
                            <label htmlFor="purchasePrice" className='text-gray-400'>Precio de compra</label>
                            <input onChange={handleChange} pattern = '[0-9]*\.?[0-9]*' type="number" name="purchasePrice" id="purchasePrice" 
                            className='block min-w-full bg-gray-100 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200' 
                            
                            />
                            {errors.purchasePrice &&
                                <div className='text-red-500 text-sm'>
                                    <ErrorShow error={errors.purchasePrice}/>
                                </div>
                            }
                        </div>
                        <div className='inputContainer mb-4'>
                            <label htmlFor="salePrice" className='text-gray-400'>Precio de venta</label>
                            <input onChange={handleChange} pattern = '[0-9]*\.?[0-9]*' type="number" name="salePrice" id="salePrice" 
                            className='block min-w-full bg-gray-100 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200' 
                            
                            />
                            {errors.salePrice &&
                                <div className='text-red-500 text-sm'>
                                    <ErrorShow error={errors.salePrice}/>
                                </div>
                            }
                        </div>
                        
                    </div>
                    <div className="flex-1 p-2">
                        
                        <div className="relative mb-4">
                            <label htmlFor="category" className='text-gray-400'>Categor??a</label>
                            {!suggestions.isSelected &&
                                <input 
                                    ref={categoryInput}
                                    onChange={handleCategory}
                                    onKeyDown={handleKeyDown}
                                    type="text" name="category" id="category" 
                                    className='block min-w-full bg-gray-100 rounded-lg p-1.5 
                                        focus:outline-none focus:ring-1 focus:ring-gray-200' 
                                />
                            }

                            {suggestions.isSelected &&
                            <>
                                <input 
                                    disabled
                                    type="text" name="category" id="category" 
                                    className='block min-w-full bg-gray-100 text-gray-400 rounded-lg p-1.5 
                                        focus:outline-none focus:ring-1 focus:ring-gray-200'
                                    value={suggestions.selectedCategory}
                                />
                                <XCircleIcon className='absolute -top-[-25%] -right-[10px]
                                                        w-6 text-red-500 cursor-pointer'
                                            onClick={clearCategory}                       
                                />
                            </>
                            }

                            {(searchTerm.length!==0 && suggestions.isSelected===false) &&
                                <div className="select-none absolute bg-gray-100 top-[95%] left-0 right-0 rounded-b-lg ring-1 ring-gray-200">
                                    {suggestions.isLoading &&
                                        <Loader/>
                                    }
                                    {!suggestions.isLoading &&
                                        suggestions.filteredSuggestions.map((category,key) => (

                                        key === suggestions.activeSuggestion ?
                                            <div key={key} onClick={() => handleClickCategory(key)} className="py-1 
                                                bg-sky-600 text-white px-3 cursor-pointer">
                                                {category.name}
                                            </div>
                                            :
                                            <div key={key} onClick={() => handleClickCategory(key)} className="px-2 py-1 
                                                hover:bg-sky-600 hover:text-white hover:px-3 cursor-pointer">
                                                {category.name}
                                            </div>

                                    ))}

                                    {(!suggestions.isLoading && !suggestions.suggestionExists) &&
                                        <div className={
                                            `${
                                                suggestions.activeSuggestion===suggestions.filteredSuggestions.length ?
                                                "cursor-pointer py-1 bg-sky-600 text-white px-3" :
                                                "cursor-pointer px-2 py-1 hover:bg-sky-600 hover:text-white hover:px-3"
                                            }`
                                            
                                        }
                                        onClick={() => handleClickCategory(suggestions.filteredSuggestions.lenght)}
                                        >
                                            <i>Crear: {searchTerm}</i>
                                        </div>
                                    }
                                </div>
                            }
                            {errors.category &&
                                <div className='text-red-500 text-sm'>
                                    <ErrorShow error={'Debes elegir la categor??a.'}/>
                                </div>
                            }
                        </div>
                        <label htmlFor="description" className='text-gray-400'>Descripci??n</label>
                        <textarea onChange={handleChange} name="description" id="description" rows="4"
                        className='block min-w-full bg-gray-100 rounded-lg mb-4 p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200' 
                        >
                        </textarea>
                    </div>
                </div>
                <button onClick={handleForm} className='mx-2 my-2 bg-sky-600 text-white px-6 py-1.5 rounded-lg hover:bg-sky-500'>Guardar</button>
            </form>
        </div>
      )
  }