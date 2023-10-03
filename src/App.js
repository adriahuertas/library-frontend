import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import Notify from "./components/Notify"
import { useApolloClient, useSubscription } from "@apollo/client"

import { BOOK_ADDED, GET_ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    console.log("updateCache", addedBook)
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: GET_ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: GET_ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      updateCacheWith(addedBook)
    },
  })

  const handleError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} handleError={handleError} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {!token && <button onClick={() => setPage("login")}>Login</button>}
        {token && <button onClick={handleLogout}>Logout</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>Recommend</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />

      <Recommend show={page === "recommend"} />

      {!token && (
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          handleError={handleError}
        />
      )}
    </div>
  )
}

export default App
