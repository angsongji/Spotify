import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, ListMusic } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-2">
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center gap-2">
          <img
            src="/album-cover.jpg"
            alt="Album Cover"
            className="w-8 h-8 rounded-md"
          />
          <div>
            <p className="text-xs font-semibold">Song Title</p>
            <p className="text-xxs text-gray-400">Artist Name</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <Shuffle size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          <SkipBack size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <SkipForward size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          <Repeat size={14} className="text-gray-500 hover:text-white cursor-pointer" />
        </div>

        {/* Volume & Other Controls */}
        <div className="flex items-center gap-2">
          <ListMusic size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          <Volume2 size={14} className="text-gray-500 hover:text-white cursor-pointer" />
          <input type="range" className="w-20" />
        </div>
      </div>

      {/* Thanh tiến trình */}
      <div className="w-full h-1 bg-gray-800 relative mt-2">
        <div className="absolute top-0 left-0 h-1 bg-gray-500 w-1/4"></div>
      </div>
    </div>
  );
};

export default Footer;