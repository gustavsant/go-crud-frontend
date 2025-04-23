'use client'
import MovieCard from "@/components/MovieCard"
import { useEffect, useState } from "react"
export default function Home() {

  const [movies, setMovies] = useState([])

  useEffect(() => {

    async function fetchData() { 
      const response = await fetch('http://localhost:3220/movies') 
      const result = await response.json()

      console.log(result[1])
      setMovies(result)
    }

    fetchData()
  }, [])

  useEffect(() => {

  }, [movies])

  async function handleDelete(movieId) {
    setMovies(prevState => prevState.filter(movie => movie.id != movieId))
  }

  return (
    <div className="h-screen w-screen bg-amber-50 flex flex-col justify-center items-center gap-12">
      <h1 className="text-center text-6xl">movies :)</h1>
      <div className="p-4 w-1/2 border h-1/2 rounded-2xl gap-4 flex flex-col items-center justify-center bg-amber-100">
        {
          movies.length == 0? 
          <div>Carregando...</div>
          :
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
              />
            ))}
          </div>
        }
      </div>
      <div className="flex">
        <button className="border px-15 py-4 bg-amber-100">adicionar</button>
      </div>
    </div>
  )
}
