import React, { useEffect, useRef, useState } from "react";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoShuffle } from "react-icons/io5";
import { SlLoop } from "react-icons/sl";
import { GoMute, GoUnmute } from "react-icons/go";
import { HiOutlineQueueList } from "react-icons/hi2";

const AudioBar = ({ currentSong, currentIndex, songs, setCurrentIndex }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  const audioRef = useRef(null);

  const cover = currentSong?.cover_image_url
  ? currentSong.cover_image_url
  : "/default-cover.jpg";


  useEffect(() => {
    if (audioRef.current && currentSong?.audio_file_url) {
      const playAudio = async () => {
        try {
          audioRef.current.load();
          await audioRef.current.play();
          setPlayStatus(true);
        } catch (err) {
          console.error("Không thể phát nhạc:", err);
          setPlayStatus(false);
        }
      };
      playAudio();
    }
  }, [currentSong?.audio_file_url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlayStatus(!playStatus);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setTime({
      current: audioRef.current.currentTime,
      duration: audioRef.current.duration || 0,
    });
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !time.duration) return;
    const percent = e.nativeEvent.offsetX / e.target.clientWidth;
    audioRef.current.currentTime = percent * time.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteClick = () => {
    if (isMuted) {
      setVolume(0.5);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleNext = () => {
    if (!songs.length) return;
  
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentIndex && songs.length > 1); // đảm bảo khác bài hiện tại
      setCurrentIndex(randomIndex);
    } else {
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentIndex(nextIndex);
    }
  };
  
  const handlePrevious = () => {
    if (!songs.length) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.play();
    } else {
      handleNext();
    }
  };

  return (
    <>
      {currentSong?.audio_file_url && (
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          <source src={currentSong.audio_file_url} type="audio/mpeg" />
        </audio>
      )}

      <div className="fixed bottom-0 h-fit bg-black flex items-center justify-between text-white w-full py-3 px-4 z-50">
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={cover}
            alt="Song Thumbnail"
          />
          <div className="flex flex-col">
            <div className="font-semibold">
              {currentSong?.name || "Chưa chọn bài hát"}
            </div>
            <div className="text-sm text-gray-400">
              {currentSong?.artist_name || ""}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-4 items-center">
            <div
              onClick={() => setIsShuffle(!isShuffle)}
              className="cursor-pointer"
            >
              <IoShuffle color={isShuffle ? "#00FF00" : "white"} size={20} />
            </div>

            <MdSkipPrevious size={25} className="cursor-pointer" onClick={handlePrevious} />

            <div
              className="bg-white rounded-full p-2 cursor-pointer"
              onClick={togglePlay}
            >
              {playStatus ? (
                <IoMdPause className="text-black" size={15} />
              ) : (
                <FaPlay className="text-black" size={15} />
              )}
            </div>

            <MdSkipNext size={25} className="cursor-pointer" onClick={handleNext} />

            <div
              onClick={() => setIsRepeat(!isRepeat)}
              className="cursor-pointer"
            >
              <SlLoop color={isRepeat ? "#00FF00" : "white"} size={20} />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-5 w-[40vw] text-gray-500">
            <span className="text-sm">{formatTime(time.current)}</span>
            <div
              className="h-1 flex-1 bg-gray-500 rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div
                className="h-1 bg-green-600 rounded-full"
                style={{
                  width: `${(time.current / time.duration) * 100 || 0}%`,
                }}
              ></div>
            </div>
            <span className="text-sm">{formatTime(time.duration)}</span>
          </div>
        </div>

        {/* Volume + Queue */}
        <div className="hidden lg:flex items-center gap-2 opacity-75 text-xl">
          <HiOutlineQueueList className="cursor-pointer" />
          {isMuted ? (
            <GoMute className="cursor-pointer" onClick={handleMuteClick} />
          ) : (
            <GoUnmute className="cursor-pointer" onClick={handleMuteClick} />
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
        </div>
      </div>
    </>
  );
};

export default AudioBar;
