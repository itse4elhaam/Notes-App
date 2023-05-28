import "../index.css";
import { Link } from "react-router-dom"

// TODO: add hover animation 
export default function NavBar() {
  return (
		<nav className="border border-gray-400 border-double w-full flex items-center py-8 justify-around">
			<Link to={"/"}>
				<h1 className="font-bold text-teal-700 text-base md:text-4xl text-center">
					INKWELL
				</h1>
			</Link>
			<ul className="flex justify-center mx-2 space-x-5 text-sm md:text-base lg:text-lg">
				<li className="text-slate-700 hover:text-sky-700 cursor-pointer transition-colors duration-150 ease-out">
					<Link to={"/new"}>New Note</Link>
				</li>
				<li className="text-slate-700 hover:text-sky-700 cursor-pointer transition-colors duration-150 ease-out">
					<Link to={"/edit"}>Edit Note</Link>
				</li>
				<li className="text-slate-700 hover:text-sky-700 cursor-pointer transition-colors duration-150 ease-out">
					<Link to={"/"}>Notes</Link>
				</li>
			</ul>
			<ul className="flex justify-center mx-2 space-x-5 text-sm md:text-base lg:text-lg">
				<li className="text-slate-700 hover:text-sky-700 cursor-pointer transition-colors duration-150 ease-out">
					<Link to={"/login"}>Login</Link>
				</li>
				<li className="text-slate-700 hover:text-sky-700 cursor-pointer transition-colors duration-150 ease-out">
					<Link to={"/signup"}>Sign up</Link>
				</li>
			</ul>
		</nav>
  );
}
