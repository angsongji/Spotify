import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { FastAverageColor } from "fast-average-color";
import { useParams } from "react-router-dom";

const fac = new FastAverageColor();

const artists = [
  {
    id: "1",
    name: "Noo Phước Thịnh",
    image: "/NooPhuocThinh.jpg",
    genre: ["Pop", "R&B"],
    followers: 1000000,
    albums: [
      {
        id: "album1",
        name: "Album 2016",
        releaseDate: "2016-06-07",
        image: "/Nhuphutbandau.jpg",
      },
      {
        id: "album2",
        name: "Album 2018",
        releaseDate: "2018-12-12",
        image: "/Thuongemladieuanhkhongthengo.jpg",
      },
    ],
    songs: [
      {
        id: "track1",
        name: "Như Phút Ban Đầu",
        duration: "3:50",
        playCount: 12000000,
      },
      {
        id: "track2",
        name: "Thương Em Là Điều Anh Không Thể Ngờ",
        duration: "4:10",
        playCount: 15000000,
      },
    ],
    bio: "Nguyễn Phước Thịnh (sinh ngày 18 tháng 12 năm 1988), thường được biết đến với nghệ danh Noo Phước Thịnh, là một nam ca sĩ, vũ công kiêm diễn viên người Việt Nam. Anh được đánh giá là một trong những nghệ sĩ âm nhạc Việt Nam xuất sắc nhất trong thế hệ của mình.",
  },
  {
    id: "2",
    name: "Hiếu Thứ Hai",
    image: "/HTH.jpg",
    genre: ["Pop", "R&B"],
    followers: 3000000,
    albums: [
      {
        id: "album1",
        name: "Album 2018",
        releaseDate: "2018-06-07",
        image: "/Ngumotminh.jpg",
      },
      {
        id: "album2",
        name: "Album 2023",
        releaseDate: "2023-12-12",
        image: "/Khongthesay.jpg",
      },
    ],
    songs: [
      {
        id: "track1",
        name: "Ngủ Một Mình",
        duration: "3:50",
        playCount: 12000000,
      },
      {
        id: "track2",
        name: "Không Thể Say",
        duration: "4:10",
        playCount: 15000000,
      },
    ],
    bio: "Trần Minh Hiếu (sinh ngày 28 tháng 9 năm 1999), thường được biết đến với nghệ danh Hieuthuhai (viết cách điệu là HIEUTHUHAI hay cách viết khác là hieuthuhai),[a] là một nam rapper và ca sĩ kiêm sáng tác nhạc người Việt Nam. Anh là thành viên của tổ đội Gerdnang.",
  },
  {
    id: "3",
    name: "Sơn Tùng M-TP",
    avatar: "https://i.scdn.co/image/ab67616100005174449c7d96a5a5c5db5d5c5d5c",
    image: "/SonTung.jpg",
    genre: ["Pop", "R&B"],
    followers: 5000000,
    albums: [
      {
        id: "album1",
        name: "Sky Tour",
        releaseDate: "2020-06-07",
        image: "/Skytour.jpg",
      },
      {
        id: "album2",
        name: "M-TP M-TP",
        releaseDate: "2017-12-12",
        image: "/MTP.jpg",
      },
    ],
    songs: [
      {
        id: "track1",
        name: "Chạy Ngay Đi",
        duration: "3:50",
        playCount: 12000000,
      },
      {
        id: "track2",
        name: "Hãy Trao Cho Anh",
        duration: "4:10",
        playCount: 15000000,
      },
    ],
    bio: "Sơn Tùng M-TP là một ca sĩ, nhạc sĩ và nhà sản xuất âm nhạc người Việt Nam. Anh là một trong những nghệ sĩ thành công nhất của Vpop với nhiều bản hit đình đám.",
  },
  {
    id: "4",
    name: "Dương Domic",
    image: "/DuongDomic.jpg",
    genre: ["Pop", "R&B"],
    followers: 2000000,
    albums: [
      {
        id: "album1",
        name: "Album 2023",
        releaseDate: "2023-06-07",
        image: "/Tranbonho.jpg",
      },
      {
        id: "album2",
        name: "Album 2024",
        releaseDate: "2024-12-12",
        image: "/Matketnoi.jpg",
      },
    ],
    songs: [
      {
        id: "track1",
        name: "Tràn bộ nhớ",
        duration: "3:50",
        playCount: 12000000,
      },
      {
        id: "track2",
        name: "Mất kết nôi",
        duration: "4:10",
        playCount: 15000000,
      },
    ],
    bio: "Trần Đăng Dương (sinh ngày 31 tháng 8 năm 2000), thường được biết đến với nghệ danh Dương Domic, là một nam ca sĩ kiêm sáng tác nhạc, rapper người Việt Nam. Xuất thân từ giới underground, anh từng có thời gian trở thành thực tập sinh cho công ty giải trí IF Entertainment của Hàn Quốc. ",
  },
  {
    id: "5",
    name: "Chi Pu",
    image: "/ChiPu.jpg",
    genre: ["Pop", "R&B"],
    followers: 1500000,
    albums: [
      {
        id: "album1",
        name: "Album 2018",
        releaseDate: "2018-06-07",
        image: "/Anhoiolai.jpg",
      },
      {
        id: "album2",
        name: "Album 2020",
        releaseDate: "2020-12-12",
        image: "/Tuhomnay.jpg",
      },
    ],
    songs: [
      {
        id: "track1",
        name: "Anh Ơi Ở Lại",
        duration: "3:50",
        playCount: 12000000,
      },
      {
        id: "track2",
        name: "Từ Hôm Nay",
        duration: "4:10",
        playCount: 15000000,
      },
    ],
    bio: "Nguyễn Thùy Chi (sinh ngày 14 tháng 6 năm 1993), thường được biết đến với nghệ danh Chi Pu, là một nữ ca sĩ, diễn viên, người dẫn chương trình kiêm người mẫu người Việt Nam. ",
  },
  {
    id: "6",
    name: "Bích Phương",
    image: "/BichPhuong.jpg",
    genre: ["Pop", "R&B"],
    followers: 2000000,
    albums: [
      {
        id: "album1",
        name: "Album 2016",
        releaseDate: "2016-06-07",
        image: "/Minhyeunhaudi.jpg",
      },
      {
        id: "album2",
        name: "Album 2023",
        releaseDate: "2023-12-12",
        image: "/Nangchentieusau.jpg",
      },
    ],
    songs: [
      {
        id: "track1",
        name: "Mình Yêu Nhau Đi",
        duration: "3:50",
        playCount: 12000000,
      },
      {
        id: "track2",
        name: "Nâng Chén Tiêu Sầu",
        duration: "4:10",
        playCount: 15000000,
      },
    ],
    bio: "Bùi Thị Bích Phương (sinh ngày 30 tháng 9 năm 1989),[1] thường được biết đến với nghệ danh Bích Phương, là một nữ ca sĩ người Việt Nam. Nổi danh từ mùa thứ ba của cuộc thi Vietnam Idol, cô đã giành được nhiều thành công đáng kể trong suốt sự nghiệp của mình, bao gồm một giải Cống hiến và nhiều giải thưởng khác.",
  }
]
  
const Artist = () => {

  const { artistId } = useParams(); // Đây là id của album, từ id này gọi api để truyền dữ liệu cho biến album
  const [colorMain, setColorMain] = useState("#ffffff");
  const [backgroundStyle, setBackgroundStyle] = useState("");
  //Mảng album này là dữ liệu test thôi, lúc sau sẽ là từ id album gọi api lên để lấy dữ lệu album

  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };
  function generateLinearGradient(hex, opacityStart = 1, opacityEnd = 0.2, angle = 50) {
    // Chuyển HEX sang RGB


    const { r, g, b } = hexToRgb(hex);

    // Tạo background linear-gradient với góc 50 độ
    return `linear-gradient(${angle}deg, rgba(${r}, ${g}, ${b}, ${opacityStart}), rgba(${r}, ${g}, ${b}, ${opacityEnd}))`;
  }
  
  // if (!albums[id*1]) {
  //   return <p className="text-white text-center">Album không tồn tại!</p>;
  // }

  useEffect(() => {
    fac.getColorAsync(artists[Number(artistId)].image).then(color => {
      console.log(color.hex);
      setColorMain(color.hex);
      let bg = generateLinearGradient(color.hex, 0.7, 0.4, 180);
      setBackgroundStyle(bg);
      console.log(color.hex); // Màu chủ đạo
    });
  }, artists[Number(artistId)].image); // useEffect chỉ chạy khi album.image thay đổi

  return (
    <div className="p-6" style={{ background: backgroundStyle }}>
      <img src={artists[Number(artistId)].image}  className="w-64 h-64 rounded-full mb-4" />
      <h1 className="text-3xl font-bold mb-2" style={{ color: colorMain }}>{artists[Number(artistId)].name}</h1>
      <p className="text-gray-400 mb-4">{artists[Number(artistId)].followers} followers</p>
      <p className="text-gray-400 mb-4">{artists[Number(artistId)].bio}</p>
      <button className="border border-white text-white px-6 py-3 rounded-full mb-4 flex items-center">
        <FaPlay className="mr-2" /> Play
      </button>
      <h2 className="text-white text-2xl font-bold mb-2">Popular Albums</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {artists[Number(artistId)].albums.map((album, index) => (
          <div key={index}>
            <img src={album.image} alt={album.name} className="w-full rounded-lg mb-2" />
            <p className="text-white">{album.name}</p>
          </div>
        ))}
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">Popular Songs</h2>
      <ul>
        {artists[Number(artistId)].songs.map((song, index) => (
          <li key={index} className="text-white flex justify-between items-center py-2 border-b border-gray-800">
            <span>{song.name}</span>
            <span className="text-gray-400">{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  

};

export default Artist;