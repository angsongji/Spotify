import React, { useContext, useEffect, useState } from "react";
import img_bichphuong from "/BichPhuong.jpg"
import { Link } from "react-router-dom";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdPause } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { SlLoop } from "react-icons/sl";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { HiOutlineQueueList } from "react-icons/hi2";
// import axios from "axios";
const track = { hinh_anh: img_bichphuong, ten_bai_hat: "Bùa yêu", artist: "Bích Phương" };
const AudioBar = () => {
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });
    const formatTime = (minute, second) => {
        const formattedMinute = minute;
        const formattedSecond = second < 10 ? `0${second}` : second;
        return `${formattedMinute}:${formattedSecond}`;
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setAudioVolume(newVolume);
        newVolume > 0 ? setIsMuted(false) : setIsMuted(true);
    };

    const handleMuteClick = () => {
        isMuted ? setIsMuted(false) : setIsMuted(true);
        const newVolume = volume === 0 ? 0.5 : 0;
        setVolume(newVolume);
        setAudioVolume(newVolume);
    };





    // const updateListen = async () => {
    //     try {
    //         await axios.post(`${url}/api/song/listens/${track.ma_bai_hat}`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    return (
        <>
            <div className="fixed bottom-0 h-fit bg-black flex items-center justify-between text-white w-full py-3 px-4">
                <div className=" flex items-center gap-4 w-fit h-full">
                    <img className="h-15 w-15 rounded-full object-cover" src={track ? track.hinh_anh : null} alt="Song Thumbnail" />
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">{track ? track.ten_bai_hat : null}</div>
                        <div className="text-sm text-gray-400">
                            {track ? track.artist : null}
                        </div>
                    </div>
                </div>

                <div className=" flex flex-col items-center gap-2 ">
                    <div className="flex gap-4 items-center ">
                        <div
                            onClick={() => setIsShuffle(!isShuffle)}
                            className="w-6 h-6 flex justify-center items-center"
                        >
                            {!isShuffle ? (
                                <IoShuffle size={20} />
                            ) : (
                                <IoShuffle color="#00FF00" size={20} />
                            )}
                        </div>
                        <div

                            className="w-6 h-6 flex justify-center items-center cursor-pointer"
                        >
                            <MdSkipPrevious size={25} />
                        </div>
                        <div className="w-7 h-7 flex justify-center items-center bg-white rounded-full">
                            {playStatus ? (
                                <IoMdPause
                                    // onClick={pause}
                                    className="cursor-pointer text-black pl-0.4"
                                    size={15}
                                />
                            ) : (
                                <FaPlay
                                    // onClick={play}
                                    className="cursor-pointer text-black pl-0.5"
                                    size={15}
                                />
                            )}
                        </div>
                        <div
                            // onClick={next}
                            className="w-6 h-6 flex justify-center items-center cursor-pointer"
                        >
                            <MdSkipNext size={25} />
                        </div>
                        <div
                            // onClick={toggleRepeat}
                            className="w-6 h-6 flex justify-center items-center"
                        >
                            {" "}
                            {!isRepeat ? (
                                <SlLoop size={20} />
                            ) : (
                                <SlLoop color="#00FF00" size={20} />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-5 w-[40vw] text-gray-500">
                        <div className="text-[14px] ">
                            {formatTime(time.currentTime.minute, time.currentTime.second)}
                        </div>
                        <div
                            // ref={seekBg}
                            // onClick={seekSong}
                            className="h-1 flex-1 bg-gray-500 rounded-full cursor-pointer relative"
                        >
                            <hr
                                // ref={seekBar}
                                className="h-1 border-none w-0 bg-green-800 rounded-full"
                            ></hr>
                        </div>
                        <div className="text-[14px]">
                            {formatTime(time.totalTime.minute, time.totalTime.second)}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-2 opacity-75 text-xl">
                    <HiOutlineQueueList className="cursor-pointer" />
                    {isMuted ? (
                        <GoMute onClick={handleMuteClick} className="cursor-pointer" />
                    ) : (
                        <GoUnmute onClick={handleMuteClick} className="cursor-pointer" />
                    )}

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 bg-white h-1 rounded cursor-pointer"
                    />
                    {/* <Link to={`/song/${track?.ma_bai_hat}`}>
                        <img className="w-3" src={assets.zoom_icon} alt="Zoom Icon" />
                    </Link> */}
                </div>
            </div>
        </>
    );
};

export default AudioBar;
