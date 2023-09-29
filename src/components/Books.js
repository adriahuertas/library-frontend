import { useQuery } from "@apollo/client"
import { GET_ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const result = useQuery(GET_ALL_BOOKS)
  const [genre, setGenre] = useState("")
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <h1>Loading...</h1>
  }

  const books = result.data.allBooks

  const allGenres = books.reduce((acc, book) => {
    return acc.concat(book.genres)
  }, [])
  const allUniqueGenres = [...new Set(allGenres)]

  const filteredBooks = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allUniqueGenres.map((gen) => {
        return gen === genre && genre !== "" ? (
          <button key={gen} onClick={() => setGenre(gen)} disabled>
            {gen}
          </button>
        ) : (
          <button key={gen} onClick={() => setGenre(gen)}>
            {gen}
          </button>
        )
      })}
      {genre ? (
        <button onClick={() => setGenre("")}>All genres</button>
      ) : (
        <button disabled>All genres</button>
      )}
    </div>
  )
}

export default Books
