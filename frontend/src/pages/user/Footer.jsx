import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, ListMusic } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4">
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center gap-3">
          <img
            src="/SonTung.jpg"
            alt="Album Cover"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-medium">Đừng làm trái tim anh đau</p>
            <p className="text-xs text-gray-400">Sơn Tùng</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-4">
          <Shuffle size={18} className="text-gray-500 hover:text-white cursor-pointer" />
          <SkipBack size={18} className="text-gray-500 hover:text-white cursor-pointer" />
          <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600"
          >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <SkipForward size={18} className="text-gray-500 hover:text-white cursor-pointer" />
          <Repeat size={18} className="text-gray-500 hover:text-white cursor-pointer" />
        </div>

        {/* Volume & Other Controls */}
        <div className="flex items-center gap-3">
          <ListMusic size={18} className="text-gray-500 hover:text-white cursor-pointer" />
          <Volume2 size={18} className="text-gray-500 hover:text-white cursor-pointer" />
          <input type="range" className="w-24" />
        </div>
      </div>

      {/* Thanh tiến trình */}
      <div className="w-full h-1 bg-gray-800 relative mt-3">
        <div className="absolute top-0 left-0 h-1 bg-gray-500 w-1/4"></div>
      </div>
    </div>
  );
};

export default Footer;
