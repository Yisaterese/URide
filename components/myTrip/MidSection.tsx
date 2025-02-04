
import React from 'react';
import Image from 'next/image';
import myTripImage from '../../public/myTrip/myTripImage.svg';
import requestRide from '../../public/myTrip/requestRide.svg';
import styles from '../../styles/styles.module.css'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
export default function MyTripMidSection(){
    return(
        <div className={'px-10 w-full md:w-[60%] mt-4 md:flex  md:justify-between '}>
            <div>
                <div className={'flex text-black  justify-between  '}>
                    <p className={'font-bold text-2xl'}>Past</p>
                    <div className={'flex p-2 gap-5 '}>
                        <div className={'flex gap-2 rounded-2xl bg-gray-300 p-1 px-2'}>
                            <PersonIcon className={'mt-1'}/>
                            <h1 className={styles.personal}>Personal</h1>
                            <KeyboardArrowDownRoundedIcon  className={styles.personalChevron1}/>
                        </div>
                        <div className={'flex gap-2 rounded-2xl bg-gray-300 p-1 px-2'}>
                            <CalendarMonthIcon className={'mt-1'}/>
                            <h1 className={styles.allTrips}>All Trips</h1>
                            <KeyboardArrowDownRoundedIcon  className={'mt-1'}/>
                        </div>
                    </div>
                </div>
                <div className={'rounded-lg border-2 f text-black text-[20px] font-bold pb-7'}>
                    <Image src={myTripImage} alt={'myTripImage'} className={'rounded-lg'}/>
                    <h1 className={'ml-5 mt-2'}>You have not taken any rides yet, take your first ride. </h1>
                    <div
                        className={'flex rounded-2xl items-center justify-center ml-4 mt-2 w-[150px] gap-2 text-black bg-gray-300 p-2'}>
                        < DirectionsCarRoundedIcon/>
                        <h1 className={'text-[12px]'}>Book now</h1>
                    </div>
                </div>
            </div >
            <div className={'mt-2 w-full'}>
                <Image src={requestRide} alt={'requestRide'} className={''} />
                <h1 className={'mt-4 text-black text-2xl font-bold'}>Get a ride in minutes</h1>
                <h1 className={'mt-2 pb-2 text-black'}>Book an Uber from a web browser, no app install necessary.</h1>
                <h1 className={'my-2 w-[120px] text-[15px] rounded-lg bg-black p-2 justify-center flex items-center '}>Request a Ride</h1>
            </div>

            </div>
    );
}