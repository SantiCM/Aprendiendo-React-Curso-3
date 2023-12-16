import { useContext } from "react"
import "./css/ShopCategory.css"
import { ShopContext } from "../context/ShopContext"
import dropdown from "../components/Assets/dropdown_icon.png"
import { Item } from "../components/Item/Item"

export const ShopCategory = (props) => {

  const {all_product} = useContext(ShopContext)
    
  return (

    <div className="shop-category">

      <img src={props.banner} alt="" className="shopcategory-banner" />

      <div className="shopcategory-indexSort">

        <p>

          <span>Showing</span> out of 36 products

        </p>

        <div className="shopcategoyr-sort">

          Sort By <img src={dropdown}></img>

        </div>

      </div>  

      <div className="shopcategory-products">

        {all_product.map((product, index) => {

          if(props.category === product.category) {

            return ( <Item 
              
              key={index} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price}

                />)
            
            } else {
              
              return null
            
            }
          }
        
        )}

      </div>

      <div className="shopcategory-loadmore">

        Explore More

      </div>

    </div>

  )

}
