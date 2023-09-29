import { useQuery } from "@apollo/client"
import { GET_USER_FAVORITE_BOOKS } from "../queries"

const Recommend = (props) => {
  const result = useQuery(GET_USER_FAVORITE_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <h1>Loading...</h1>
  }

  const favoriteBooks = result.data.allFavoriteBooks
  console.log(favoriteBooks)

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
          {favoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Recommend
