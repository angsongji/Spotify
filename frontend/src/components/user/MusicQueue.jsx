import React from "react";

const MusicQueue = () => {
    const queue = [
        {
            id: 1,
            title: "Bùa yêu",
            artist: "Bích Phương, Phúc Du",
            image: "/BichPhuong.jpg", // Thay bằng đường dẫn ảnh thực tế
        },
    ];

    return (
        <div className="text-white p-4">
            <h1 className="text-lg font-semibold mb-6">Bích Phương</h1>
            <div className="space-y-6">
                {queue.map((song) => (
                    <div key={song.id} className="bg-[#181818] p-6 rounded-lg flex flex-col items-center">
                        <img src={song.image} alt={song.title} className="w-60 h-60 rounded-md" />
                        <div className="mt-6 text-center">
                            <h2 className="text-white font-medium text-lg">{song.title}</h2>
                            <p className="text-gray-400 text-sm mt-2">{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicQueue;
