'use client';
import React, { useState } from 'react';
import { RideDetailsProps } from "../../types/types";
import Image from "next/image";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import URideX from '../../public/ride/URideX.png';

const RideDetails: React.FC<RideDetailsProps> = ({
                                                  image = URideX,
                                                  title = "Default Title",
                                                  icon,
                                                  numberOfPersons,
                                                  time,
                                                  text,
                                                  price,
                                                  classname = '',
                                                  onClick,
                                                  isActiveBorder = false,
                                              }) => {

    return (
        <div
            onClick= {()=>({ image, title, icon, numberOfPersons, time, text, price, classname})}
            className={`overflow-auto h-[120px] flex pt-2 gap-2 rounded-lg my-2 text-black cursor-pointer w-full transition-all duration-200 ${isActiveBorder ? 'border border-black' : 'border border-transparent'}` }
            tabIndex={0}
            aria-label={`Ride details for ${title}`}
        >
            <Image src={image} alt={`${title} Vehicle Image`} width={60} height={50} className="rounded" />
            <div className="flex my-2 pr-3 items-center">
                <div className="py-2 gap-2 text-[13px]">
                    <div className="flex gap-2 pr-2">
                        <h1 className="pr-1 text-[15px] font-bold">{title}</h1>
                        <div className="flex items-center gap-1">
                            <PersonRoundedIcon className="h-3 w-3" />
                            <h1>{numberOfPersons}</h1>
                        </div>
                    </div>
                    <h1>{time}</h1>
                    <h1 className={classname}>{text}</h1>
                </div>
                <h1 className="font-bold text-xl my-5 ml-2">{price}</h1>
            </div>
        </div>
    );
};

export default RideDetails;
