import {
    HomeIcon,
    SearchIcon,
    UserIcon,
    UserGroupIcon,
    PlusCircleIcon,
    RssIcon,
    LoginIcon,
    LogoutIcon
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from 'next-auth/react';

function changeBtnVal(id, newText){
    var element = document.getElementById(id);
    element.value = newText;
    element.innerHTML = newText;
    return false;
}

function Sidebar(props){
    const {data: session} = useSession();
    const { home, profile, listen, explore, social } = props;

    return (
        <div className="text-gray-500 p-5 text-sm font-semibold border-r border-gray-900">
            <div className="space-y-4">
                <button onClick={home} className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-6 w-6" />
                    <p>Home</p>
                </button>

                {session ? (
                    <button onClick={() => signOut()} className="flex items-center space-x-2 hover:text-white">
                        <LogoutIcon className="h-6 w-6" />
                        <p>Sign Out</p>
                    </button>
                ) : (
                    <button onClick={() => signIn()} className="flex items-center space-x-2 hover:text-white">
                        <LoginIcon className="h-6 w-6" />
                        <p>Sign In</p>
                    </button>
                )}

                <button onClick={profile} className="flex items-center space-x-2 hover:text-white">
                    <UserIcon className="h-6 w-6" />
                    <p>Profile</p>
                </button>
                <button onClick={social} className="flex items-center space-x-2 hover:text-white">
                    <UserGroupIcon className="h-6 w-6" />
                    <p>Social</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                <button onClick={explore} className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-6 w-6" />
                    <p>Explore</p>
                </button>
                <button onClick={listen} className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-6 w-6" />
                    <p>Listen</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-6 w-6" />
                    <p>Create</p>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;