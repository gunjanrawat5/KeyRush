import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-[#071d36]">
      <nav className="flex justify-center py-4 text-[#F4F4F4] gap-12 text-2xl ">
        <Link className="px-4 py-2 rounded hover:bg-gray-300 hover:text-black" to="/">Home</Link>
        <Link className="px-4 py-2 rounded hover:bg-gray-300 hover:text-black" to="/leaderboard">Leaderboard</Link>
        <Link className="px-4 py-2 rounded hover:bg-gray-300 hover:text-black" to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}
