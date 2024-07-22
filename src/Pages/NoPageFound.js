import ImageNotFound from '../images/notFound.jpg'
const PageFound = () => {
    return <div className='flex justify-center items-center h-screen' style={{background:"white"}}>
     <img class="h-auto max-w-lg mx-auto" src={ImageNotFound} alt="image description"/>
    </div>

}

export default PageFound