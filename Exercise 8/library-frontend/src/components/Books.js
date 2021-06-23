import React from 'react'
import Genres from './Genres';
import BooksTable from './BooksTable';

const Books = (props) => {

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      <h4>in genre {props.genre ? props.genre : "all genres"}</h4>
      <BooksTable filteredBooks={props.filteredBooks} />
      <Genres genres={props.uniqueGenreList} setGenre={props.setGenre} />
    </div>
  )
}

export default Books