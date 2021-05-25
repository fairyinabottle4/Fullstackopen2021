import React from 'react'

const NewBlogForm = ({
  addBlog,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
  <form onSubmit={addBlog} id="create">
    <div>
      Title:
      <input
        value={newBlogTitle}
        onChange={handleTitleChange}
        id="Title"
      />
      <br/>
      Author:
      <input
        value={newBlogAuthor}
        onChange={handleAuthorChange}
        id="Author"
      />
      <br/>
      Url:
      <input
        value={newBlogUrl}
        onChange={handleUrlChange}
        id="Url"
      />
    </div>
    <button type="submit">create</button>
  </form>  
)}

export default NewBlogForm
