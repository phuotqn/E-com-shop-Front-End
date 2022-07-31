import Header from "../components/Header-Footer/Header";
import BreadCrumb from "../components/Header-Footer/BreadCrumb";
import Footer from "../components/Header-Footer/Footer";

import ProductFilter from "../components/content/products/ProductFilter";
import ProductsContent from "../components/content/products/Products";

import { Container, Grid } from "@mui/material";

const breadCrumbs = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "All Products",
    route: "/products",
  }
]

function ProductsPage() {
  return (
    <div style={{ backgroundColor: "#f4f5fb" }}>
      <Header />
      <BreadCrumb breadCrumbs={breadCrumbs} />

      {/* Fillter  */}
      <ProductFilter />

      <Container className="mb-5">
        <Container>
          <Grid item xs={12} mt={8} mb={1} p={2} align="center">
            <div>
              <h5 className="title">
                <b>ALL PRODUCT</b>
              </h5>
            </div>
          </Grid>
        </Container>
        <Grid
          container
        >
          <ProductsContent />
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

export default ProductsPage;
