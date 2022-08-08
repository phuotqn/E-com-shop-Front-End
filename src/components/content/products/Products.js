import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent, Pagination, Link } from "@mui/material";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const { allProduct, nameProduct, minPrice, maxPrice, productTypes } =
    useSelector((reduxData) => reduxData.taskReducer);

  //Pagination
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [noPage, setNoPage] = useState(0);

  const changePageHandler = (event, value) => {
    setPage(value);
  };

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(
    (data) => {
      if (
        nameProduct === "" &&
        productTypes === "" &&
        minPrice === 0 &&
        maxPrice === 0
      ) {
        fetchAPI("http://localhost:8000/products")
          .then((data) => {
            setNoPage(Math.ceil(data.data.length / limit));
            dispatch({
              type: "ALL_PRODUCT",
              setProducts: data.data.slice((page - 1) * limit, page * limit),
            });
            console.log(data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      } else {
        fetchAPI(
          `http://localhost:8000/products/?name=${nameProduct}&type=${productTypes}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        )
          .then((data) => {
            setNoPage(Math.ceil(data.data.length / limit));
            dispatch({
              type: "ALL_PRODUCT",
              setProducts: data.data.slice((page - 1) * limit, page * limit),
            });
            console.log(data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    },
    [limit, page, nameProduct, productTypes, minPrice, maxPrice]
  );

  return (
    <Grid container>
      <Grid container>
        {allProduct.map((product, index) => {
          return (
            <Grid item xs={12} lg={2} md={3} sm={6} className="p-2 pt-0" key={index}>
              <Link href={product._id} style={{ textDecoration: "none" }}>
                <div className="product-card">
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        // height="140"
                        width="200"
                        image={product.imageUrl}
                        alt="green iguana"
                        className="img-card"
                      />
                      <CardContent>
                        <Typography
                          style={{ fontSize: "14px", height: "40px" }}
                          component="div"
                          className="name-product"
                        >
                          <b>{product.name}</b>
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          <strike>{product.buyPrice}</strike>
                        </Typography>

                        <Typography variant="body2" sx={{ color: "red" }}>
                          <b>{product.promotionPrice}</b>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      <Grid container justifyContent="end" mt={4}>
        <Grid item>
          <Pagination
            color="secondary"
            count={noPage}
            defaultPage={page}
            onChange={changePageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Products;
