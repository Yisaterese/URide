import React from 'react';
import suggestRide from '../../public/home/suggestRide.png';
import Image from 'next/image';
import suggestionMidImage from '../../public/home/suggestionMidImage.png';
import URideBussiness from '../../public/home/URideBussiness.png';
import QRCode from '../../public/home/QRCode.png';
import {Icon} from '@iconify/react';
export default function MidSection() {
    return (
        <div className="my-10 mx-10 ">
            <div className="text-black w-[400px] md:w-100% sm:w-[50%]">
                <p className="font-bold text-3xl p-2">Suggestions</p>
                <div className="bg-[#F3F3F3] rounded flex px-4">
                    <div>
                        <h1 className="text-lg py-2">Ride</h1>
                        <h1 className="text-[12px] py-2">
                            Go anywhere with URide. Request a <br/>
                            ride, hop in, and go
                        </h1>
                        <h1 className="bg-white rounded-2xl w-[80px] justify-center flex items-center ml-2 p-2">
                            Details
                        </h1>
                    </div>
                    <Image src={suggestRide} alt="suggestRide"/>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between md:gap-[100px] h-auto mt-[80px]">
                <Image
                    src={suggestionMidImage}
                    alt="suggestionMidImage"
                    className="w-full md:w-[500px] sm:w-full"
                />
                <div className="text-black py-5 md:py-[100px]">
                    <h1 className="font-semibold text-4xl py-3">
                        Drive when you want, make what you need
                    </h1>
                    <h1>
                        Make money on your schedule with deliveries or rides—or
                        <br/>
                        both. You can use your own car or choose a rental
                        <br/>
                        through Uber.
                    </h1>
                    <div className="flex gap-5 mt-4">
                        <p className="sm:text-[12px] bg-black items-center px-2 py-2 rounded text-white">
                            Get started
                        </p>
                        <p className="rounded text-black items-center flex border-b-2 pr-4">
                            Already have an account? Sign in
                        </p>
                    </div>
                </div>
            </div>

            <div className={'flex flex-col sm:flex-col md:flex-row py-3 md:pt-[120px] sm:pt-8'}>
                <div className={'py-8 pr-5 w-full items-center'}>
                    <p className={'text-3xl text-black font-extrabold'}>
                        The URide you <br/> know, reimagined <br/> for business
                    </p>
                    <p className={'py-2 text-black'}>
                        Uber for Business is a platform for managing global rides and <br/>
                        meals, and local deliveries, for companies of any size.
                    </p>
                    <div className={'flex gap-5'}>
                        <h1 className={'rounded text-white bg-black py-2 px-3 items-center'}> Get started</h1>
                        <h2 className={'flex border-b-2 items-center text-black'}>Check out our solutions</h2>
                    </div>
                </div>
                <Image src={URideBussiness} alt={'URideBusiness'} className={'h-[500px] w-[500px]'}/>
            </div>


            {/*<div className={'flex sm:flex-col md:flex-row justify-between text-black mt-10'}>*/}
            {/*    <div className={'rounded sm:w-full md:w-1/2'}>*/}
            {/*        <p className={'sm:text-xl sm:font-semibold text-3xl md:font-extrabold'}>It’s easier in the apps</p>*/}
            {/*        <div className={'mt-5 bg-[#F3F3F3] flex justify-between'}>*/}
            {/*            <div className={'flex mt-5 items-center gap-5 mx-5'}>*/}
            {/*                <Image src={QRCode} alt={'QRcode'} className={'h-[150px] w-[150px]'}/>*/}
            {/*                <p className={'text-2xl font-bold'}>*/}
            {/*                    Download the URide app*/}
            {/*                    <p className={'text-[12px]'}> Scan to download</p>*/}
            {/*                </p>*/}
            {/*                <Icon icon={'gg:arrow-right'} className={'h-8 w-8'}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className={'rounded sm:hidden md:flex-row sm:w-full md:w-1/2'}>*/}
            {/*        <p className={'sm:text-xl sm:font-semibold text-3xl md:font-extrabold'}>It’s easier in the apps</p>*/}
            {/*        <div className={'mt-5 bg-[#F3F3F3] flex justify-between'}>*/}
            {/*            <div className={'flex mt-5 items-center gap-5 mx-5'}>*/}
            {/*                <Image src={QRCode} alt={'QRcode'} className={'h-[150px] w-[150px]'}/>*/}
            {/*                <p className={'text-2xl font-bold'}>*/}
            {/*                    Download the URide app*/}
            {/*                    <p className={'text-[12px]'}> Scan to download</p>*/}
            {/*                </p>*/}
            {/*                <Icon icon={'gg:arrow-right'} className={'h-8 w-8'}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
}
