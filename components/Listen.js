import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    ArrowCircleDownIcon
} from '@heroicons/react/outline';
import useSpotify from "../hooks/useSpotify";
import lid from "./lid";

function Listen() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [isClicked, setIsClicked] = useState(false);
    const [initialClick, setInitialClick] = useState(false);
    const [Recommendations, setRecommendations] = useState([]);

    const saveManipulation = async (item) => {
        const res = await fetch('/api/manipulations', {
            method: 'POST',
            body: JSON.stringify(item),
        });
        const data = await res.json();
    };

    const getRecommended = () => {
        if(!initialClick){
            setInitialClick(true);
        }
        setIsClicked(true);
        saveManipulation({
            lid: lid(),
            username: session?.user?.name,
            m_d: parseFloat(document.getElementById("max_danceability").value),
            m_i: parseFloat(document.getElementById("max_instrumentalness").value),
            m_s: parseFloat(document.getElementById("max_speechiness").value),
        });
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && isClicked == true){
            spotifyApi.getRecommendations({
                max_danceability: document.getElementById("max_danceability").value,
                max_instrumentalness: document.getElementById("max_instrumentalness").value,
                max_speechiness: document.getElementById("max_speechiness").value,
                seed_genres: ['indie', 'indie-pop'],
            }).then((data) => {
                setRecommendations(data.body.tracks);
            });
            setIsClicked(false);
        }
    }, [isClicked, session, spotifyApi]);

    console.log(Recommendations);

    return(
        <div className="flex-grow">
            <div className="flex items-end space-x-7 bg-gradient-to-r
            from-pink-400 via-purple-500 to-yellow-500 h-80" />
            <div className="flex flex-row gap-x-64">
                <div className="pl-1 pt-2">
                    <div className="font-bold text-white text-5xl">Find Your VibeZ </div>
                    <div className="pl-1 pt-2 text-gray-600 text-lg">
                        Adjust the sliders appropriately to find your vibes:
                    </div>
                    <div className="h-80 overflow-y-scroll">
                        <div className="pt-5">
                            <input type="range" id="max_instrumentalness" name="max_instrumentalness"
                                    min="0" max = "1" step = "0.05"/>
                            <label for="max_instrumentalness" className="pl-2 font-normal text-lg
                                        text-white">Max Instrumentalness</label>
                            <div className="pl-1 pt-2 text-green-400 font-light text-lg">
                                Define how instrumental you want your song to be.
                            </div>
                        </div>
                        <div className="pt-5">
                            <input type="range" id="max_danceability" name="max_danceability"
                                    min="0" max = "1" step = "0.05" />
                            <label for="max_danceability" className="pl-2 font-normal text-lg
                                        text-white">Max Danceability</label>
                            <div className="pl-1 pt-2 text-green-400 font-light text-lg">
                                Define your urge to dance to your song.
                            </div>
                        </div>
                        <div className="pt-5">
                            <input type="range" id="max_speechiness" name="max_speechiness"
                                    min="0" max = "1" step = "0.05" />
                            <label for="max_danceability" className="pl-2 font-normal text-lg
                                        text-white">Max Speechiness</label>
                            <div className="pl-1 pt-2 text-green-400 font-light text-lg">
                                Define the richness of the words in your song.
                            </div>
                        </div>
                        <button onClick={getRecommended} 
                        className="pt-5 flex items-center space-x-2 hover:text-green-400">
                            <ArrowCircleDownIcon className="h-8 w-8" />
                            <p className="font-bold text-lg">Get Recommendations</p>
                        </button>
                    </div>
                </div>
                { initialClick ? (
                    <div className="flex flex-col pt-2">
                        <p className="text-indigo-500 text-2xl font-semibold">Here are our recommendations:</p>
                        <div className="h-80 overflow-y-scroll">
                            {Recommendations.map((track, index) => (
                                <div key = {track.id} className="flex flex-col">
                                    <p className = "pl-1 pt-2 text-sm font-bold text-white">{index+1}</p>
                                    <div className="font-semibold pl-7 pt-2 text-green-400 text-lg">
                                        <div className="flex flex-row">
                                            <img className="h-20 w-20" src={track.album.images[0].url} />
                                            <div className = "pl-3">
                                                <p>{track.name}</p>
                                                <p className = "font-light text-gray-600">{track.artists[0].name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
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

export default Listen;