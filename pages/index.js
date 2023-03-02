import Sidebar from "../components/Sidebar"
import Center from "../components/Center";
import Profile from "../components/Profile";
import Listen from "../components/Listen";
import Explore from "../components/Explore";
import Social from "../components/Social";
import { useState } from "react";

export default function Home(){
  const [isProfile, setIsProfile] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isListen, setIsListen] = useState(false);
  const [isExplore, setIsExplore] = useState(false);
  const [isSocial, setIsSocial] = useState(false);

  const goHome = () => {
    setIsHome(true);
    setIsProfile(false);
    setIsListen(false);
    setIsExplore(false);
    setIsSocial(false);
  }

  const goProfile = () => {
    setIsHome(false);
    setIsProfile(true);
    setIsListen(false);
    setIsExplore(false);
    setIsSocial(false);
  }

  const goListen = () => {
    setIsListen(true);
    setIsHome(false);
    setIsProfile(false);
    setIsExplore(false);
    setIsSocial(false);
  }

  const goExplore = () => {
    setIsListen(false);
    setIsHome(false);
    setIsProfile(false);
    setIsExplore(true);
    setIsSocial(false);
  }

  const goSocial = () => {
    setIsListen(false);
    setIsHome(false);
    setIsProfile(false);
    setIsExplore(false);
    setIsSocial(true);
  }

  return(
    <div className = "bg-black h-screen overflow-hidden">
      <main className = "flex">
        <Sidebar home={goHome} profile={goProfile} listen={goListen} explore={goExplore} 
        social = {goSocial} />
        {
          isHome ? (
            <Center /> 
          ) : isProfile ? (
            <Profile />
          ) : isListen ? (
            <Listen />
          ) : isExplore ? (
            <Explore />
          ) : isSocial ? (
            <Social />
          ) : <></>
        }
      </main>
    </div>
  );
}