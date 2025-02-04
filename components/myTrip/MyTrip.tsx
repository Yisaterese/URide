'use client';
import React, {useState} from 'react';
import profile from "../../public/myTrip/profile.jpeg";
import Image from "next/image";
import Hamburger from "../Hambuger";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReceiptIcon from '@mui/icons-material/Receipt';
import  Link  from 'next/link';
export default function MyTrip(){
    const [dropDown, setDropDown] = useState(false);

    const handleDropDown=()=>{
         setDropDown(true);
    }
    const handleDropDownLeave=()=>{
        setDropDown(false);
    }


    return(
        <div className={'text-black  flex gap-2 p-1 cursor-pointer '}>
            <div className={'hover:border-b-black gap-1 hover:border-b-4 flex'}>
                <ReceiptIcon className={'mt-2.5'}/>
                <h1 className={'py-2'}>My Trips</h1>
            </div>
            <Link href={'/myTrip'} >
                <div onMouseEnter={handleDropDown} onMouseLeave={handleDropDownLeave} className={'flex '}>
                    <Image src={profile} alt={'profile'} className={'h-10 w-10 rounded-2xl'}/>
                    <KeyboardArrowDownIcon className={'mt-2.5'}/>
                    <Hamburger isOpen={dropDown}/>
                </div>
            </Link>


        </div>
    );
}