import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

function Profile() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [TopTracks, setTopTracks] = useState([]);
    const [Manipulations, setManipulations] = useState([]);
    const [initialClick, setInitialClick] = useState(false);

    const getManipulation = async () => {
        const res = await fetch('/api/manipulations', {
            method: 'GET'
        });
        const data = await res.json();
        setManipulations(data);
    };
    
    if(!initialClick){
        getManipulation();
        setInitialClick(true);
    }
    console.log(Manipulations);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getMyTopTracks().then((data) => {
                setTopTracks(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return(
        <div className="flex-grow">
            <div className="flex items-end space-x-7 bg-gradient-to-r
             from-green-400 via-blue-500 to-indigo-500 h-80" />
            <div className="flex flex-row gap-x-12">
                <div className="pl-1 pt-2">
                    <div className="font-bold text-white text-5xl">Top Tracks </div>
                    <div className="pl-1 pt-2 text-gray-600 text-lg">
                        Below are the top tracks that you have been listening to recently:
                    </div>
                    <div className="h-80 overflow-y-scroll">
                        {TopTracks.map((track, index) => (
                            <div key = {track.id}>
                                <p className = "pl-1 text-sm font-bold text-white">{index+1}</p>
                                <div className="font-semibold pl-7 pt-2 text-green-400 text-lg">
                                    <p>{track.name}</p>
                                    <p className = "font-light text-gray-600">{track.artists[0].name}</p>
                                </div>
                                <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pl-1 pt-2">
                    <div className="font-bold text-white text-5xl">History </div>
                    <div className="pt-2 text-gray-600 text-lg">
                        Your past manipulations on our core feature Listen:
                    </div>
                    <div className="h-80 overflow-y-scroll">
                        <div className="pt-5 flex flex-row gap-x-16">
                            <div className= "flex flex-col">
                                <div className="font-semibold text-red-500 text-lg">Max Instrumentalness</div>
                                {Manipulations.map((manip) => (
                                    <div key={manip.lid} className="flex flex-col">
                                        <p className="grid pt-5 text-white font-thin place-content-center">{manip.m_i}</p>
                                        <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                                    </div>
                                ))}
                            </div>
                            <div className= "flex flex-col">
                                <div className="font-semibold text-red-500 text-lg">Max Danceability</div>
                                {Manipulations.map((manip) => (
                                    <div key={manip.lid} className="flex flex-col">
                                        <p className="grid pt-5 text-white font-thin place-content-center">{manip.m_d}</p>
                                        <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                                    </div>
                                ))}
                            </div>
                            <div className= "flex flex-col">
                                <div className="font-semibold text-red-500 text-lg">Max Speechiness</div>
                                {Manipulations.map((manip) => (
                                    <div key={manip.lid} className="flex flex-col">
                                        <p className="grid pt-5 text-white font-thin place-content-center">{manip.m_s}</p>
                                        <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
}

export default Profile;