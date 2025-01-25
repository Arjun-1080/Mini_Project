import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

function SearchPage() {

 //Details   
  const poster = 'https://resizing.flixster.com/W15dNIYCMxFtwADEUFrQDUj0Q2g=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7951929_v_v10_af.jpg';  
  const title = "3-Idiots";
  const desc = "In college, Farhan and Raju form a great bond with Rancho due to his positive and refreshing outlook to life. Years later, a bet gives them a chance to look for their long-lost friend whose existence seems rather elusive.";

//Reviews
    const rating = 4.5;
    const popcorn = 83;
    const tomato = 100;



  const [formData, setFormData] = useState('');  
  const [isSearched, setIsSearched] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleSearch = () => {
    if (formData.trim() !== '') {
      setIsSearched(true);
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] flex items-center relative overflow-x-hidden">
   
      <div className="h-[600px] w-[600px] bg-[var(--primary)] opacity-20 rounded-full absolute top-[40px] left-[1100px]"></div>
      

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isSearched ? "top-10" : "top-1/2 -translate-y-1/2"
        }`}
      >
        {!isSearched && (
          <p className="text-[30px] text-white text-center mb-4">
            Discover the latest <span className="text-[var(--primary)]">movies</span> and{" "}
            <span className="text-[var(--secondary)]">ratings</span>
          </p>
        )}

        <div className="flex gap-6 justify-center">
          <input
            type="text"
            className="w-[350px] h-[55px] bg-white rounded-2xl outline-[var(--primary)] p-5 text-[18px]"
            placeholder="Search"
            value={formData}
            onChange={handleInputChange}
          />
          <div
            className="h-[55px] w-[55px] bg-[var(--secondary)] rounded-full rounded-bl-none flex justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            <SearchIcon size={30} color="#000" />
          </div>
        </div>
      </div>
      
      {isSearched && (
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 p-6 text-white w-full h-full flex flex-col items-center gap-12">
          <div className='h-fit w-[98%] flex justify-between'>
            <img src={poster} alt="poster" className='h-[400px]' />
            <div className='w-[60%] '>
                <p className='text-[50px] text-[var(--primary)]'>{title}</p>
                <p className='w-[60%]'>{desc}</p>
            </div>
            <div className='flex flex-col gap-2 items-end w-[100px] h-full mt-15'>
                <p className='text-[42px] w-full mb-1'>Rating</p>
                <div className='flex items-center justify-end gap-6 w-full'><img src="/icons/star.svg" alt="star" className='scale-[1.3] w-full'/><p className='text-[30px]'>{rating}</p></div>
                <div className='flex items-center gap-4'><img src="/icons/popcorn.svg" alt="star" className='w-full'/><p className='text-[30px]'>{popcorn}%</p></div>
                <div className='flex items-center gap-4'><img src="/icons/tomato.svg" alt="star" className='w-full'/><p className='text-[30px]'>{tomato}%</p></div>
            </div>
          </div>
          <div className='w-full h-fit flex justify-center items-center flex-col gap-10' >
            <div className='w-[660px] h-10  flex items-center gap-8'> 
                <p className='text-[35px]'> Reviews</p>
                <button className='bg-[#00912D] p-2 w-[130px] text-center rounded-lg cursor-pointer'>Download xls</button>
            </div>
            <div className='flex flex-col gap-10 pb-20'>
                <ReviewCard/>
                <ReviewCard/>
                <ReviewCard/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function ReviewCard() {
  return (
    <div className='flex w-[660px] gap-10'>
       <div className=''>
        <h1 className='w-fit text-2xl'>TNT B</h1>
       </div>
       <div>
        <div className='flex justify-between'>
            <p className='text-[var(--primary)] text-2xl'>★★★★★</p>
            <p className='text-[#ffffff80]'>Jan 2, 2025</p>
        </div>
        <p>Phim hay, đáng xem cho sinh viên và học sinh, hài và cảm động.👍☺️</p>
       </div>
    </div>
  )
}


export default SearchPage;
