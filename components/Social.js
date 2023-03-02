import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import lid from './lid';

function Social() {
    const spotifyApi = useSpotify();
    const{ data: session, status } = useSession();
    const [Followed, setFollowed] = useState([]);
    const [initialClick, setInitialClick] = useState(false);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getFollowedArtists({
                type: "artist",
                limit: 50,
            }).then((data) => {
                setFollowed(data.body.artists.items);
            });
        }
    }, [session, spotifyApi]);

    console.log(Followed);

    // Save Genres
    const saveGenres = async (item) => {
        const res = await fetch('/api/genres', {
            method: 'POST',
            body: JSON.stringify(item),
        });
        const data = await res.json();
    };

    if(!initialClick){
        for(let i=0; i < Followed.length; i++){
            saveGenres({
                lid: lid(),
                userId_G: session?.user?.name,
                genre: Followed[i].genres[0],
            });
        }
        setInitialClick(true);
    }

    return(
        <div className="flex-grow">
            <div className="flex items-end space-x-7 bg-gradient-to-r
                from-yellow-400 via-green-500 to-indigo-500 h-80" />
            <div className="flex flex-row gap-x-12">
                <div className="pl-1 pt-2">
                    <div className="font-semibold text-white text-5xl">Followed </div>
                    <div className="pt-2 text-gray-600 text-lg">
                        Those who inspired you:
                    </div>
                    <div className="h-80 overflow-y-scroll">
                        {Followed.map((artist, index) => (
                            <div key = {artist.id} className="flex flex-col">
                                <p className = "pl-1 pt-2 text-sm font-bold text-white">{index+1}</p>
                                <div className="font-semibold pl-7 pt-2 text-green-400 text-lg">
                                    <div className="flex flex-row">
                                        <img className="h-20 w-20" src={artist.images[0].url} />
                                        <div className = "pl-3">
                                            <p>{artist.name}</p>
                                            <p className = "font-light text-gray-600">Main Genre: {artist.genres[0]}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="pl-1 h-80 pt-5">
                    <img className="rounded-full h-40 w-40" src={Me.images[0].url} />
                    <div className="pt-5 font-semibold text-white text-5xl">{Me.followers.total} Followers </div>
                    <div className="pt-2 text-gray-600 text-lg">
                        {Me.followers.total} users on Spotify have been inspired by you.
                    </div>
                </div> */}
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

export default Social;