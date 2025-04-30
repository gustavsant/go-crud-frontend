'use client'
import MovieCard from "@/components/MovieCard"
import ModalCreate from '@/components/ModalCreate'
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
export default function Home() {

  const [movies, setMovies] = useState([])
  const [me, setMe] = useState({})
  const [showModal, setShowModal] = useState(false)

  async function fetchData() {
    setMovies([])
    const movies = await fetch('http://localhost:3220/movies')
    const meRoute = await fetch("http://localhost:3220/me", {
      method: "GET",
      credentials: "include"
    })
    const movieResult = await movies.json()
    const meResult = await meRoute.json()


    setMe(meResult)
    setMovies(movieResult)
  }

  async function handleLogout() {
    await fetch("http://localhost:3220/logout", {
      method: "POST",
      credentials: "include"
    })

    setMe({})
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {

  }, [movies, me])

  async function handleDelete(movieId) {
    setMovies(prevState => prevState.filter(movie => movie.id != movieId))
  }

  return (
    <div className="h-screen w-screen bg-amber-50 flex flex-col justify-center items-center gap-12">
      <h1 className="text-center text-6xl">
        {me.email != undefined ?
          `Bem vindo ${me.email}`
          :
          "Bem vindo"
        }</h1>
      <div className="p-4 w-1/2 border h-1/2 rounded-2xl gap-4 flex flex-col items-center justify-center bg-amber-100">
        {
          movies ?
            <div className="gap-4 flex flex-col overflow-auto">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  description={movie.description}
                  cover={movie.cover}
                  rating={movie.rating}
                  handleDelete={handleDelete}
                  fetchData={fetchData}
                  userLoggedIn={me.email != undefined}
                />
              ))}
            </div>
            :
            <div>Carregando...</div>

        }
      </div>
      {me.email != undefined ?
        <div className="flex">
          <button onClick={() => setShowModal(!showModal)} className="border px-15 py-4 bg-amber-100">adicionar</button>
        </div> :
        <div className="flex">
          <button onClick={() => redirect("/login")} className="border px-15 py-4 bg-amber-100">fazer login</button>
        </div>}

      {showModal &&
        <ModalCreate setShowModal={setShowModal} fetchData={fetchData} />}
      {
        me.email == undefined ?
          <></>
          :
          <button onClick={handleLogout} className="cursor-pointer absolute top-0 right-0 border px-6 py-2">
            logout
          </button>
      }
    </div>
  )
}
