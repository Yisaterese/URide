import { SignIn } from '@clerk/nextjs';


export default function Page() {
    return (
        <div className="relative flex justify-center items-center">
                <SignIn />
        </div>
    );
}
