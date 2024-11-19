import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="flex w-full py-2 bg-black ">
            <div className="flex justify-between items-center w-full text-white px-[60px]">
                <div className="flex gap-7 items-center">
                    <h1 className="text-[30px]">URide</h1>
                    <div className="hidden md:flex gap-7 items-center">
                        <h1>Ride</h1>
                        <h1>Drive</h1>
                        <div className="flex gap-2">
                            <h1>About us</h1>
                            <Icon icon={'mdi:chevron-down'} className={'text-2xl'} />
                        </div>
                    </div>
                    <div className="relative flex md:hidden">
                        <Icon
                            icon={isDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                            className="text-2xl cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="absolute top-8 left-0 w-[150px] bg-white text-black rounded-md shadow-lg z-50">
                                <ul className="flex flex-col py-2">
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Ride</li>
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Drive</li>
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">About us</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <h1>Help</h1>
                    <Icon icon={'mingcute:user-4-fill'} className="h-8 w-8" />
                </div>
            </div>
        </div>
    );
}