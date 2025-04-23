import { PiTrashBold } from "react-icons/pi";
import { PiPencilBold } from "react-icons/pi";
import {PiStar} from "react-icons/pi"

async function deleteMovie(movieId, handleDelete) {
    const response = await fetch(`http://localhost:3220/movies/${movieId}`, {
        method: "DELETE",
    })

    const result = await response.json()
    console.log(result);
    handleDelete(movieId)
    
}

export default function MovieCard({id, title, description, rating, cover, handleDelete}) {
    return (
        <div className="w-full bg-amber-200 flex gap-4 p-4">
            <img src={cover} alt='movie cover' className="max-w-32 max-h-32"/>
            <div className="flex flex-col text-start flex-1">
                <span className="text-2xl">{title}</span>
                <span className="min-h-9 flex-1 overflow-hidden">{description}</span>
                <div className="flex items-center gap-2">
                    <PiStar/>{rating}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <PiTrashBold onClick={() => deleteMovie(id, handleDelete)} className="cursor-pointer" size={24}/>
                <PiPencilBold className="cursor-pointer" size={24}/>
            </div>
        </div>
    )
}