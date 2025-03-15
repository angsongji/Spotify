import { useParams } from "react-router-dom";
const Song = () => {
    const { songId } = useParams();
    return <h1 className="text-gray-500">Trang chi tiết Song: {songId}</h1>
}

export default Song;