import Link from 'next/link'

export default function Header() {
    return (
        <>
        <div className='grid grid-cols-4 border-2'>
        <Link 
          href='/'>
          <a className='text-white  rounded-md  bg-blue-600 m-10  h-12  
        justify-center text-2xl text-center '>Home</a>
          </Link>
            <Link href='/chicken'>
            <a className='text-white  rounded-md  bg-blue-600 m-10 h-12  
        justify-center text-2xl text-center'>Chicken Page</a>
            </Link>
            <Link href='/eggv2'>
            <a className='text-white  rounded-md  bg-blue-600 m-10 h-12  
        justify-center text-2xl text-center'>EGGV2 Page</a>
            </Link>
            <Link href='/feed'>
            <a className='text-white  rounded-md  bg-blue-600 m-10 h-12  
        justify-center text-2xl text-center'>Feed Page</a>
            </Link>
          
        </div>
        </>  
          )
}