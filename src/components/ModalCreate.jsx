import { useState } from "react"
import { PiXBold } from "react-icons/pi"

export default function ModalCreate({ setShowModal }) {

    const [modal, setModal] = useState(true)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(0.00)
    const [cover, setCover] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()
        const newMovie = {
            title: title,
            description: description,
            rating: Number(rating),
            cover: cover
        }
        const response = await fetch("http://localhost:3220/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie)
        })

        console.log(response)
    }

    return (
        <div className="transition-all absolute h-screen w-screen flex justify-center items-center backdrop-brightness-40">
            <div className="flex-col z-100 p-4 w-1/3  border bg-amber-100 flex justify-center items-center">
                <div className="flex w-full "><span className="flex-1">Adicionar filme</span><PiXBold className="cursor-pointer hover:scale-125 transition-all" onClick={() => setShowModal(false)} /></div>
                <div className="flex justify-center items-center flex-1 py-12">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label>Titulo do filme</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="border p-1" placeholder="Avengers" />
                        </div>

                        <div className="flex flex-col">
                            <label>Descrição do filme</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Descrição" className="border"></input>
                        </div>

                        <div className="flex flex-col">
                            <label>Nota do filme</label>
                            <input value={rating} onChange={(e) => setRating(e.target.value)} type="number" placeholder="7.4" className="border"></input>
                        </div>

                        <div className="flex flex-col">
                            <label>Capa do filme (URL da imagem)</label>
                            <input value={cover} onChange={(e) => setCover(e.target.value)} type="text" placeholder="https://..." className="border"></input>
                        </div>
                        <button type="submit" className="mt-4 border px-5 py-2 bg-amber-100">Confirmar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}