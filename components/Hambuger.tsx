'use client';
import React  from 'react';
export default function Hamburger(state:{isOpen: boolean}){

    return(
        <div className={`absolute z-5000 left-[1050px]  text-black bg-[#D1D5DB] top-[60px]  flex-col cursor-pointer p-7 gap-2 rounded-lg ${state.isOpen? 'flex':'hidden'}`}>
            <div className={'flex gap-2 hover:text-purple-700 hover:translate-y-[-5px] '}>
                <h1>Wallet</h1>
            </div>
            <div className={' hover:translate-y-[-5px] hover:text-purple-700'}>
                <h1>Promos</h1>
            </div>
            <div className={'flex gap-2 hover:translate-y-[-5px] hover:text-purple-700'}>
                <h1>Support</h1>
            </div>
            <div className={'flex gap-2 hover:translate-y-[-5px] hover:text-purple-700'}>
                <h1>Manage Account</h1>
            </div>
            <div className={'flex gap-2 hover:translate-y-[-5px] hover:text-purple-700'}>
                <h1>Settings</h1>
            </div>
        </div>
    );
}