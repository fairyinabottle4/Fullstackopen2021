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
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        value={newBlogTitle}
        onChange={handleTitleChange}
        name="Title"
      />
      <br/>
      Author:
      <input
        value={newBlogAuthor}
        onChange={handleAuthorChange}
      />
      <br/>
      Url:
      <input
        value={newBlogUrl}
        onChange={handleUrlChange}
      />
    </div>
    <button type="submit">create</button>
  </form>  
)}

export default NewBlogForm
