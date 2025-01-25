
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='w-full h-[60px] border-b border-[var(--grey-border)] p-2 flex items-center'>
       <Link to='/'><img src="/logo.svg" alt="" className='h-[50px]' /></Link>
    </div>
  )
}

export default NavBar