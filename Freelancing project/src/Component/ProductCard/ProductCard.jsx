
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Style from './ProductCard.module.css'


export default function ProductCard({product}) {
  
let {id,title,price,image,category} = product;
 
function handleAddToWishlist(){
  console.log("Added to wishlist");
}
  
  return (
    <>
     
       <div className='col-10 col-lg-3 col-md-4 mb-5 gy-3 position-relative ' style={{height:450}}>
        <div className={`card p-4 border-0 rounded rounded-4 ${Style.productCard}`}  >
          <img src={image} className="card-img-top  ms-xl-3  p-3" alt="..." style={{height:300,width:"100%"}}/>
          <div className="card-body">
            <h4 className="card-title fs-4 fw-bold text-center">{title.split(" ").splice(0,2).join(" ")}</h4>
            <div className='d-flex justify-content-between mt-3'>
              <p className='fw-bold'>{price} <span className='text-success'>جنيها</span></p>
              <p><span className='fs-5'><i className="fa-solid fa-star text-warning"></i></span></p>
            </div >
            <Link to={`/product/${id}/${category}`} className="btn btn-sm text-white w-100 p-0 " style={{backgroundColor:"#0A2647"}}>
            <h5 className='mt-2'>تفاصيل المنتج</h5>
          </Link>
            <Badge className={`position-absolute top-0 end-0 ${Style.cartIcon}`} ><IconButton className="btn btn-dark fs-5 p-2 mt-2 w-100 " onClick={handleAddToWishlist} ><FavoriteIcon sx={{color:"red"}}/></IconButton></Badge>
          </div>
        </div>
       </div>


        

    </>
  )
}
