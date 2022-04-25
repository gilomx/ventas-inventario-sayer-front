export const Home = () => {
  return (
    <>
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
          Dashboard<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div> 
    </>
    )
}