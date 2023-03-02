import { useSession } from 'next-auth/react';

function Center() {
    const{ data: session } = useSession();

    if(session){
        return(
            <div className="flex-grow">
                <div className="flex items-end space-x-7 bg-gradient-to-r
                 from-purple-400 via-pink-500 to-red-500 h-80" />
                <div className="pl-1 h-80 pt-2">
                    <div className="font-semibold text-white text-5xl">Welcome </div>
                    <div className="pl-1 pt-2 text-gray-600 text-lg">
                        Explore. Listen. Create. Welcome to VibeZ.
                    </div>
                </div>
                <div className="absolute top-5 right-8">
                    <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer
                    rounded-full p-1 pr-3">
                        {(session?.user?.image) ? <img className="rounded-full h-10 w-10" src={session?.user?.image} alt="user_logo" />
                        : <div />}
                        <div className="subpixel-antialiased font-semibold text-white">
                            {session?.user?.name}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return(
            <div className="flex pl-1 text-2xl subpixel-antialiased font-semibold h-60 items-center text-white">
              Please sign in to use our services...
            </div>
        );
    }
}

export default Center;