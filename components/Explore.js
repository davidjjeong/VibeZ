import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import {
    ArrowCircleDownIcon
} from '@heroicons/react/outline';
import lid from "./lid";

function Explore () {
    const spotifyApi = useSpotify();
    const{ data: session, status } = useSession();
    const [initialClick, setInitialClick] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isArtist, setIsArtist] = useState(false);
    const [isTrack, setIsTrack] = useState(false);
    const [isGenre, setIsGenre] = useState(false);
    const [Recommendations, setRecommendations] = useState([]);
    const [Genres, setGenres] = useState([]);

    // Save related artists in our database
    const saveArtists = async (item) => {
        const res = await fetch('/api/artists', {
            method: 'POST',
            body: JSON.stringify(item),
        });
        const data = await res.json();
    };

    // Save related tracks in our database
    const saveTracks = async (item) => {
        const res = await fetch('/api/tracks', {
            method: 'POST',
            body: JSON.stringify(item),
        });
        const data = await res.json();
    }

    const getGenres = async () => {
        const res = await fetch('/api/genres', {
            method: 'GET'
        });
        const data = await res.json();
        setGenres(data);
    };

    if(!initialClick){
        getGenres();
        console.log(Genres);
    }

    // Get Recommendations based on set parameter values
    useEffect(() => {
        if(spotifyApi.getAccessToken() && isClicked == true){
            spotifyApi.getRecommendations({
                max_energy: document.getElementById("max_energy").value,
                max_liveness: document.getElementById("max_liveness").value,
                max_popularity: document.getElementById("max_popularity").value,
                seed_genres: ['indie', 'indie-pop'],
            }).then((data) => {
                setRecommendations(data.body.tracks);
            });
            setIsClicked(false);
        }
    }, [isClicked, session, spotifyApi]);

    console.log(Recommendations);

    const exploreArtists = () => {
        if(!initialClick){
            setInitialClick(true);
        }
        setIsArtist(true);
        setIsTrack(false);
        setIsGenre(false);
        setIsClicked(true);

        // save the related artists in database every time button is clicked
        for(let i=0; i < Recommendations.length; i++){
            saveArtists({
                lid: lid(),
                userId_A: session?.user?.name,
                artist: Recommendations[i].artists[0].id,
            });
        }
        // setIsClicked(false);
    }

    const exploreTracks = () => {
        if(!initialClick){
            setInitialClick(true);
        }
        setIsArtist(false);
        setIsTrack(true);
        setIsGenre(false);
        setIsClicked(true);

        // save the related tracks in database every time button is clicked
        for(let i=0; i < Recommendations.length; i++){
            saveTracks({
                lid: lid(),
                userId_T: session?.user?.name,
                trackID: Recommendations[i].id,
                trackName: Recommendations[i].name,
                singer: Recommendations[i].artists[0].id,
            });
        }
        // setIsClicked(false);
    }

    const exploreGenres = () => {
        if(!initialClick){
            setInitialClick(true);
        }
        setIsArtist(false);
        setIsTrack(false);
        setIsGenre(true);
        setIsClicked(true);
        // setIsClicked(false);
    }

    return(
        <div className="flex-grow">
            <div className="flex items-end space-x-7 bg-gradient-to-r
             from-blue-400 via-purple-500 to-red-500 h-80" />
            <div className = "flex flex-row gap-x-64">
                <div className="pl-1 h-80 pt-2">
                    <div className="font-semibold text-white text-5xl">Explore </div>
                    <div className="pl-1 pt-2 text-gray-600 text-lg">
                        Explore related artists, tracks, genres, and many more.
                    </div>
                    { (initialClick && isArtist) ? (
                        <div className="h-80 overflow-y-scroll">
                            {Recommendations.map((track, index) => (
                                <div key = {track.id} className="flex flex-col">
                                    <p className = "pl-1 pt-2 text-sm font-bold text-white">{index+1}</p>
                                    <div className="flex flex-row pl-3 font-light text-gray-600">
                                        {track.artists[0].name}
                                    </div>
                                    <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                                </div>
                            ))}
                        </div>
                    ) : (initialClick && isTrack) ? (
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
                    ) : (initialClick && isGenre) ? (
                        <div className="h-80 overflow-y-scroll">
                            {Genres.map((gen, index) => (
                                <div key = {gen.id} className="flex flex-col">
                                    <p className = "pl-1 pt-2 text-sm font-bold text-white">{index+1}</p>
                                    <div className="flex flex-row pl-3 font-light text-gray-600">
                                        {gen.genre}
                                    </div>
                                    <hr className="space-y-2 border-t-[0.1px] border-gray-900" />
                                </div>
                            ))}
                        </div>
                    ) : <></>
                    }
                </div>
                <div>
                    <div className="pt-5 text-gray-600 text-lg">
                        Explore the new music realm with our own unique customization engine:
                    </div>
                    <div className="h-80 overflow-y-scroll">
                        <div className="pt-5">
                            <input type="range" id="max_energy" name="max_energy"
                                    min="0" max = "1" step = "0.05"/>
                            <label for="max_energy" className="pl-2 font-normal text-lg
                                        text-white">Max Energy</label>
                            <div className="pl-1 pt-2 text-green-400 font-light text-lg">
                                How dynamic you want your artist, track, or genre to be.
                            </div>
                        </div>
                        <div className="pt-5">
                            <input type="range" id="max_liveness" name="max_liveness"
                                    min="0" max = "1" step = "0.05" />
                            <label for="max_liveness" className="pl-2 font-normal text-lg
                                        text-white">Max Liveness</label>
                            <div className="pl-1 pt-2 text-green-400 font-light text-lg">
                                How engaging you want your real-time music experience to be.
                            </div>
                        </div>
                        <div className="pt-5">
                            <input type="range" id="max_popularity" name="max_popularity"
                                    min="0" max = "100" step = "1" />
                            <label for="max_popularity" className="pl-2 font-normal text-lg
                                        text-white">Max Popularity</label>
                            <div className="pl-1 pt-2 text-green-400 font-light text-lg">
                                How personal you want your artist, track, or genre to be.
                            </div>
                        </div>
                        <button onClick={exploreArtists} className="pt-5 flex items-center space-x-2 hover:text-green-400">
                            <ArrowCircleDownIcon className="h-8 w-8" />
                            <p className="font-bold text-lg">Explore Related Artists.</p>
                        </button>
                        <button onClick={exploreTracks} className="pt-5 flex items-center space-x-2 hover:text-green-400">
                            <ArrowCircleDownIcon className="h-8 w-8" />
                            <p className="font-bold text-lg">Explore Related Tracks.</p>
                        </button>
                        <button onClick={exploreGenres} className="pt-5 flex items-center space-x-2 hover:text-green-400">
                            <ArrowCircleDownIcon className="h-8 w-8" />
                            <p className="font-bold text-lg">Explore Related Genres.</p>
                        </button>
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

export default Explore;