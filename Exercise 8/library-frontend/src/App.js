import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm';
import Notify from './components/Notify';
import Recommendations from './components/Recommendations';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [genre, setGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    } 
  }, [result])

  useEffect(() => {
    if (!genre) {
      setFilteredBooks(books)
    } else {
      const booksFilter = books.filter(book => book.genres.includes(genre))
      setFilteredBooks(booksFilter)
    }
  }, [genre, books])

  const genres = books.map(b => b.genres)
  const flatGenreList = genres.flat()
  const uniqueGenreList = Array.from(new Set(flatGenreList))

  useEffect(() => {
    const loggedInUser = localStorage.getItem("fullstack-user-token");
    if (loggedInUser) {
      setToken(loggedInUser);
    }
  }, [setToken]);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(`New book added: ${bookAdded.title}`)
      updateCacheWith(bookAdded)
    }
  })


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }
  console.log(token)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
            <button onClick={() => setPage('recommendations')}>reccomendations</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
        isLoggedIn={token}
      />

      <Authors
        show={page === 'authors'}
        isLoggedIn={token}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        setGenre={setGenre}
        genre={genre}
        filteredBooks={filteredBooks}
        uniqueGenreList={uniqueGenreList}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />
      <Recommendations
        show={page === 'recommendations'}
      />

    </div>
  )
}



export default App