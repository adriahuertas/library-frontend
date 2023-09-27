import { useMutation, useQuery } from "@apollo/client"
import { GET_ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useState } from "react"
import Select from "react-select"

const Authors = (props) => {
  const result = useQuery(GET_ALL_AUTHORS)

  if (result.loading) {
    return <h1>Loading...</h1>
  }

  const authors = result.data.allAuthors

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthdayForm authors={authors} />
    </div>
  )
}

const BirthdayForm = ({ authors }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      console.log(message)
    },
  })

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  const handleUpdateAuthor = (e) => {
    e.preventDefault()
    updateAuthor({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) },
    })
    setName("")
    setBorn("")
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdateAuthor}>
        <div>
          name
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input onChange={(e) => setBorn(e.target.value)} value={born} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}
export default Authors
