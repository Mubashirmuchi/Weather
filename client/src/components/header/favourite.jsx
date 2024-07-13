import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from '../../config/axiosService';
import {Heart} from 'iconsax-react'
import { toast } from 'react-toastify';


const FavoriteButton = ({ userId, city }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {search,user}  = useSelector((store) => store.user);
  const handleFavoriteClick = async () => {
    try {
     
      const data = await axiosInstance.post('/favorite',{city:search,userId:user.user.id});

      toast.success(`${search} is added to favourite`);

      setIsFavorite(true); 
    } catch (error) {
      console.error('Error setting favorite city:', error);
    }


  };


  return (
    <button className='cursor-pointer' onClick={handleFavoriteClick}>
      
<div className="flex bg-slate-800 p-2 rounded-lg">
{isFavorite ? 'Favorite Set' : 'Set as Favorite'}
<Heart/> 
</div>

    </button>
  );
};

export default FavoriteButton;
