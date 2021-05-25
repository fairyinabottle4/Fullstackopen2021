import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewblogForm from './NewblogForm'

test('check details in the blog form', () => {
    const addBlog = jest.fn()
    const author_change_stub = jest.fn()
    const title_change_stub = jest.fn()
    const url_change_stub = jest.fn()


    const component = render(<NewblogForm
        addBlog={addBlog}
        handleAuthorChange={author_change_stub}
        handleTitleChange={title_change_stub}
        handleUrlChange={url_change_stub}
    />)

    const title = component.container.querySelector('#Title')
    const author = component.container.querySelector('#Author')
    const url = component.container.querySelector('#Url')
    const form = component.container.querySelector('#create')

    fireEvent.change(title, {
      target: { value: 'New Blog Title' },
    })
    fireEvent.change(author, {
      target: { value: 'New Blog Author' },
    })
    fireEvent.change(url, {
      target: { value: 'New Blog Url' },
    })
    fireEvent.submit(form)

    expect(title_change_stub).toBeCalledTimes(1)
    expect(title.value).toBe("New Blog Title")
    expect(author_change_stub).toBeCalledTimes(1)
    expect(author.value).toBe("New Blog Author")
    expect(url_change_stub).toBeCalledTimes(1)
    expect(url.value).toBe("New Blog Url")
})