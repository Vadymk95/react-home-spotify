import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Navigation: FC = () => {
  return (
    <nav className="flex items-center justify-between h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold">Github Search</h3>
      <span>
        <Link className="mr-2" to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  )
}
