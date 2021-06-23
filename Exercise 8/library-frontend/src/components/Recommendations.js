import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Recommendations = (props) => {
  const meResult = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })
  const [user, setUser] = useState(null)
  const [userBooks, setUserBooks] = useState([])

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      console.log(meResult.data.me.favoriteGenre)
      setUser(meResult.data.me)
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
  }, [meResult, user, getBooks])

  //as a side effect of displaying the page and hence useLazyQuery, the result of useLazyQuery
  //is set to the user
  useEffect(() => {
    if (result.data) {
      setUserBooks(result.data.allBooks)
    } 
  }, [result])

  if (!props.show) {
    return null
  }




  return (
    <div>
      <h2>recommendations</h2>
      <h4>books in your favourite genre {user.favoriteGenre}</h4>
      <BooksTable filteredBooks={userBooks} />

    </div>
  )
}

export default Recommendations