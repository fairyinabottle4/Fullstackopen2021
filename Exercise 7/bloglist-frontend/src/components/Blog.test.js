import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const mockUpdateBlog = jest.fn()
    const mockDeleteBlog = jest.fn()

    beforeEach(() => {
        const user = {
            name: 'Test User',
            username: 'Testusername'
        }  
      
        const blog = {
          title: 'Kafka on the Shore',
          author: 'Haruki Murakami',
          url: 'https://en.wikipedia.org/wiki/Kafka_on_the_Shore',
          likes: 57,
          user: user
        }
            
        component = render(
            <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
        )
        
    })

    test('renders title and author but not url or likes', () => {

        //5.13
        const title = component.container.querySelector('.blog-title-author')
        expect(title).toHaveTextContent(
          'Kafka on the Shore'
        )
        expect(title).toHaveTextContent(
          'Haruki Murakami'
        )
        expect(title).not.toHaveTextContent(
          'https://en.wikipedia.org/wiki/Kafka_on_the_Shore'
        )
        expect(title).not.toHaveValue(
            57
        )
      })
      
      test('clicking the button shows url and likes', () => {
          
          const button = component.getByText('view')
          fireEvent.click(button)
      
          const details = component.container.querySelector('.blog-details')
          expect(details).toHaveTextContent(
              'https://en.wikipedia.org/wiki/Kafka_on_the_Shore'
          )
          expect(details).toHaveTextContent(
              57
          )
      })

      test('clicking the like button twice invokes the handler twice', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

         const like_button = component.getByText('like')
         fireEvent.click(like_button)
         fireEvent.click(like_button)
         expect(mockUpdateBlog.mock.calls).toHaveLength(2)
      })
    
      
})


