import { useParams } from "react-router-dom";
const Album = () => {
    const { albumId } = useParams();
    return <h1 className="text-gray-500">Trang chi tiết albumId: {albumId}</h1>
}

export default Album;