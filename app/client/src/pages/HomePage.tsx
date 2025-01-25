import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='h-[calc(100vh-60px)] flex flex-col items-center justify-center relative text-white'>
        <div className='h-[300px] w-[300px] bg-[var(--secondary)] opacity-20 rounded-full absolute top-[-120px] left-[-70px]'></div>
        <p className='text-[50px]'>Welcome to</p>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-[130px] m-3 leading-none'>
            CriticCrawl</h1>
        <p className='mt-1 text-[20px]'>Discover the latest movies and ratings with CriticCrawl</p>

        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-[50px] w-[150px] rounded-xl text-black flex justify-center
        items-center mt-4">
            <Link to='/search' className='text-[22px] font-medium'>Get started</Link>
        </div>

    </div>
  )
}

export default HomePage