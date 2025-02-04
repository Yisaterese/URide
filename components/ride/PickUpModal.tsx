import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function PickUpModal(){
    return(

        <div className={'text-black '}>
            <div className={'flex'}>
                <ArrowBackIcon/>
                <h1 className={'p-2'}>Clear</h1>
            </div>
        </div>
    );
}

