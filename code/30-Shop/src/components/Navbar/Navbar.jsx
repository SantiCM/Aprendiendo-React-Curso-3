import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {

    const [menu, setMenu] = useState("shop")
  
    return (
  
        <div className='navbar'>

            <div className="nav-logo">

                <img src={logo} alt="Logo Tienda"/>

                <p>SHOPPER</p>

            </div>

            <ul className="nav-menu">

                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: "none", color: "black"}} to="/">Shop</Link> {menu === "shop" ? <hr></hr> : ""} </li>

                <li onClick={() => {setMenu("mens")}}><Link style={{textDecoration: "none", color: "black"}} to="/mens">Men</Link> {menu === "mens" ? <hr></hr> : ""}</li>

                <li onClick={() => {setMenu("womens")}}><Link style={{textDecoration: "none", color: "black"}} to="/womens">Women</Link> {menu === "womens" ? <hr></hr> : ""}</li>
                
                <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration: "none", color: "black"}} to="/kids">Kids</Link> {menu === "kids" ? <hr></hr> : ""}</li>

            </ul>

            <div className="nav-login-cart">

                <Link to="/login"><button>Login</button></Link>

                <Link to="/cart"><img src={cart_icon} alt="Carrito De Compras"></img></Link>

                <div className="nav-cart-count">

                    0

                </div>

            </div>


        </div>
  
    )

}