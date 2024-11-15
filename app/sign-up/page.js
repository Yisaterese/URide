import { SignUp } from '@clerk/nextjs'
import Image from 'next/image';
import signInImage from '../../public/signInPage/signInImage.jpeg';

export default function Page() {
    return (
        <div className={'flex justify-center'}>

            <SignUp />
        </div>
    );
}