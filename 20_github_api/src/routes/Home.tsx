import { UserProps } from '../types/user'

import Search from '../components/Search'

import { useState } from 'react'

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null)

  const loadUser = async (userName: string) => {
    const res = await fetch(`https://api.github.com/users`)
    const data = await res.json()

    setUser(data)
    console.log(data)
  }

  return (
    <div>
      <Search loadUser={loadUser} />
    </div>
  )
}

export default Home
