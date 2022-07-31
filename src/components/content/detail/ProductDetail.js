import { Container, Grid, Typography, Button, Rating } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Row,Col} from "reactstrap"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useDispatch, useSelector } from "react-redux"

function ProductDetail() {
  //Link đến trang theo ID
  const { productId } = useParams();

  const { cart } = useSelector((reduxData) => reduxData.cartReducer);
  const [show,setShow] = useState(false)
  let getCount = localStorage.getItem(productId) ?? 0
  const [count, setCount] = useState(parseInt(getCount));

  const [productInfo, setProductInfo] = useState({});


  //Tính tiền
  const [quantity, setQuantity] = useState(0);
  const [bill, setBill] = useState(0);

  const dispatch = useDispatch();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  const btnAddCart = () => {
    var cartCount = parseInt(cart) + quantity
    setCount(count + quantity);
    localStorage.setItem(productId, count)
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_CART",
        cart: cartCount,
        id: productInfo._id,
      })
    }
    localStorage.setItem("cart", cartCount)
  };

  //Tính tiền
  const minusQuantity = () => {
    setQuantity(quantity === 0 ? 0 : quantity - 1);
  };

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Load API
  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchAPI("http://localhost:8000/products/" + productId)
      .then((data) => {
        console.log(data);
        setProductInfo(data.data)
      })
      .catch((error) => {
        console.error(error.message);
      });
    //Tính tiền
    setBill(quantity === 0 ? 0 : quantity * productInfo.promotionPrice);
  }, [quantity]);

  localStorage.setItem(productId, count)

  return (
    <Container style={{ backgroundColor: "#ffffff" }}>
      <Grid container mt={5} p={3}>
        <Grid item xs={5}>
          <img
            src={productInfo.imageUrl}
            style={{ width: "80%", borderRadius: "14px" }}
          />
        </Grid>

        <Grid item xs={1}>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">
                <b>{productInfo.name}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container mt={3}>
            <Grid item xs={12}>
              <Rating
                name="half-rating-read"
                defaultValue={4.5}
                precision={0.5}
                readOnly
              />
            </Grid>
          </Grid>

          <Grid container mt={5}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strike>
                  <b style={{ opacity: 0.7 }}>{productInfo.buyPrice}</b>
                </strike>
              </Typography>
            </Grid>
          </Grid>

          <Grid container mt={1}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b style={{ color: "red" }}>{productInfo.promotionPrice}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={5}>
            <Grid container>
              <Grid item xs={12} md={3} sm={6} lg={3}>
                <Grid container>
                  <Grid item xs={3} align="right">
                    <Typography variant="h5" mt={2}>
                      {quantity}
                    </Typography>
                  </Grid>

                  <Grid item xs={9} sm={6}>
                    <Button style={{color:"black"}} onClick={plusQuantity} size="small">
                      <AddCircleIcon />
                    </Button>

                    <Button style={{color:"black"}} onClick={minusQuantity} size="small">
                      <RemoveCircleIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={9} sm={4} md={9} mt={1}>
                <Button variant="contained" style={{backgroundColor:"black",color:"white"}} onClick={btnAddCart}>
                  <b>Add to cart</b>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid p={1} mt={2} mb={5} item xs={12} md={6} lg={6} sm={12}
            style={{
              color: "white",
              backgroundColor:"black",
              borderRadius: "10px",
            }}
          >
            <Typography  align="center" variant="body1">
              <MonetizationOnIcon  /> <b>Thành tiền:</b>
              &nbsp; <span>{bill.toLocaleString()}</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={8} className="p-3" style={{ borderRadius: "14px" }}>
        <Grid item xs={12} lg={8} sm={12} md={8} mt={2} pb={5}>
          <Typography variant="body1">{productInfo.description}</Typography>
        </Grid>
      </Grid>

      <Row className="mt-5">
                <h3 style={{ fontFamily: "Roboto" }}>Description</h3>
                <Typography style={{ fontFamily: "Roboto" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Row style={{ marginTop: "50px", justifyContent: "center" }}>
                    {
                        show ? <img src={productInfo.imageUrl} style={{ width: "80%" }}></img> : null
                    }
                    <Row className="mt-3" style={{ justifyContent: "center" }}>
                        <Button onClick={() => setShow(!show)} style={{ backgroundColor: "black", color: "white", width: "100px" }}>View All</Button>
                    </Row>
                </Row>
            </Row>
    </Container>
  );
}

export default ProductDetail;
