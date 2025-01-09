import React from 'react';
import {HeaderMenu} from '../lists/list';
import MyTrip from "../components/myTrip/MyTrip";

export default function Header() {
    return (
        <div className={`p-3 flex justify-between border border-b-4 w-full border-b-gray-300 `}>
            <div className={'flex justify-center gap-5'}>
                <p className={'text-black p-2 pl-3 md:p-1 md:pl-10 pb-3 md:text-4xl font-bold'}>URide</p>
                {
                    HeaderMenu.map((item) => (
                    <div key={item.id} className="md:flex hidden  font-medium items-center text-black">
                        {item.icon}
                        <p className="ml-2 hidden md:block">{item.name}</p>
                    </div>
                    ))
                }
            </div>
            <MyTrip />
        </div>
    );
}
