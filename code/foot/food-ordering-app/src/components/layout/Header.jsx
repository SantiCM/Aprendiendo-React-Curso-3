import Link from "next/link";

export default function Header () {
  
    return (
        <header className="flex items-center justify-between">

            <nav className="flex items-center gap-8 text-gray-900 font-bold text-xl">

                <Link className="text-primary font-semibold text-2xl" href="">PIZZA COMPANY</Link>

                <Link href={"/"}>Home</Link>

                <Link href="">Menu</Link>

                <Link href="">About</Link>

                <Link href="">Contact</Link>

            </nav>

            <nav className="flex items-center gap-4 text-gray-900">
                
                <Link href={"/login"} className="font-bold text-xl">Login</Link>

                <Link href={"/register"} className="bg-primary rounded-lg text-white px-8 py-2 font-medium text-lg">Register</Link>

            </nav>

        </header>
    
    )

}