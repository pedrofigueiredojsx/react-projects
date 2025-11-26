import { useState, useEffect } from 'react'
import axios from 'axios'

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true)

  const fetchPosts = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}$_limit=10`
      )

      if (response.data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.data])
      } else {
        setHasMoreData(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page])

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {isLoading && <p>Carregando mais posts...</p>}
    </div>
  )
}

export default InfiniteScroll
