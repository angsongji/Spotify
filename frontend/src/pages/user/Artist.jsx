import { useParams } from "react-router-dom";
const Artist = () => {
    const { artistId } = useParams();
    return <h1 className="text-gray-500">Trang chi tiết artist: {artistId}</h1>
}

export default Artist;