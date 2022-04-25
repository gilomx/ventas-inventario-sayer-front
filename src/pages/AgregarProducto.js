export const AgregarProducto = () => {
    return (
      <>
          <div className='box-content p-2 m-12 rounded-lg bg-white drop-shadow-sm'>
            <h1 className="text-xl">{"<-"} Agregar producto</h1>
                <form>
                    <div className="flex flex-auto">
                        <div className="flex-1 p-2">
                            <label htmlFor="email" className='text-gray-400'>Email</label>
                            <input type="email" name="email" id="email" 
                            className='block min-w-full bg-gray-100 rounded-lg mb-4 p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200' 
                            
                            />
                        </div>
                        <div className="flex-1 p-2">
                            <label htmlFor="password" className='text-gray-400'>Password</label>
                            <input type="password" name="password" id="password"
                            className='block min-w-full bg-gray-100 rounded-lg mb-4 p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200'
                            
                            />
                        </div>
                    </div>
                    <button className='bg-sky-600 text-white px-6 py-1.5 rounded-lg hover:bg-sky-500'>Login</button>
                </form>
          </div> 
      </>
      )
  }