import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Shop } from './pages/Shop'
import { ShopCategory } from './pages/ShopCategory'
import { Product } from './pages/Product'
import { Card } from './pages/Card'
import { LoginSingUp } from './pages/LoginSingUp'
import mern_banner from "./components/Assets/banner_mens.png"
import women_banner from "./components/Assets/banner_women.png"
import kids_banner from "./components/Assets/banner_kids.png"


const App = () => {
  
  return (
   
    <>

      <BrowserRouter>

        <Navbar></Navbar> 


        <Routes>

          <Route path="/" element={<Shop></Shop>}></Route>

          <Route path="/mens" element={<ShopCategory category="men" banner={mern_banner}></ShopCategory>}></Route>

          <Route path="/womens" element={<ShopCategory category="women" banner={women_banner}></ShopCategory>}></Route>

          <Route path="/kids" element={<ShopCategory category="kid" banner={kids_banner}></ShopCategory>}></Route>

          <Route path="product" element={<Product></Product>}>

            <Route path=":productId" element={<Product></Product>}></Route>

          </Route>

          <Route path="/cart" element={<Card></Card>}></Route>
          
          <Route path="/login" element={<LoginSingUp></LoginSingUp>}></Route>

        </Routes>
      
      </BrowserRouter>
    
    </>
  
  )

}

export default App