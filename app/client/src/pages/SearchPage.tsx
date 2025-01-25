import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import axios from 'axios';
import backendURL from '../lib/backendURL';
import * as XLSX from 'xlsx'
import SmallLoader from '../components/loader/Loader';

function SearchPage() {

  const [formData, setFormData] = useState('');  
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleSearch = async () => {
    if (formData.trim() !== '') {
      setIsLoading(true);
      console.log(backendURL)
      try {
          const response = await axios.post(`${backendURL}/getMovies`,{name : formData});
          console.log(response.data);
          setIsSearched(true);
          setData(response.data);
      }catch(e : any){
        console.log(e.message)
      }
      finally{
        setIsLoading(false);
      }
    }
  };

  const toXLSX = () =>{
    const worksheet = XLSX.utils.json_to_sheet(data?.reviews);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${data?.details?.title}.xlsx`);

}

  
  const poster = data?.details?.poster || '';
  const title = data?.details?.title || '';
  const desc = data?.details?.desc || '';

  const rating = data?.details?.rating || 4.5;
  const popcorn = data?.details?.popcornmeter || 0;
  const tomato = data?.details?.tomatometer || 0;

  const list = data?.reviews?.map((item : any,i : any) => (
    <ReviewCard item={item} key={i}/>
  ))
  
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
            disabled={isLoading}
          />
          <div
            className="h-[55px] w-[55px] bg-[var(--secondary)] rounded-full rounded-bl-none flex justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            {isLoading?<SmallLoader/>:<SearchIcon size={30} color="#000" />}
  
            
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
                <div className='flex items-center gap-4'><img src="/icons/popcorn.svg" alt="star" className='w-full'/><p className='text-[30px]'>{popcorn}</p></div>
                <div className='flex items-center gap-4'><img src="/icons/tomato.svg" alt="star" className='w-full'/><p className='text-[30px]'>{tomato}</p></div>
            </div>
          </div>
          <div className='w-full h-fit flex justify-center items-center flex-col gap-10' >
            <div className='w-[660px] h-10  flex items-center gap-8'> 
                <p className='text-[35px]'> Reviews</p>
                <button className='bg-[#00912D] p-2 w-[130px] text-center rounded-lg cursor-pointer'
                        onClick={toXLSX}>Download xls</button>
            </div>
            <div className='flex flex-col gap-10 pb-20'>
                {list}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function ReviewCard({item} : any) {

  return (
    <div className='flex w-[660px] gap-10'>
       <div className=''>
        <h1 className='w-[200px] text-2xl'>{item.username}</h1>
       </div>
       <div>
        <div className='flex justify-between'>
            <p className='text-[var(--primary)] text-2xl'>★{item.rating}</p>
            <p className='text-[#ffffff80]'>{item.date}</p>
        </div>
        <p>{item.review}</p>
       </div>
    </div>
  )
}


export default SearchPage;
