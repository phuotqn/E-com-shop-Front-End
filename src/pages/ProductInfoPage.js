import Header from "../components/Header-Footer/Header";
import BreadCrumb from "../components/Header-Footer/BreadCrumb";
import Footer from "../components/Header-Footer/Footer";

import ProductDetail from "../components/content/detail/ProductDetail";
import RelatedProject from "../components/content/detail/RelatedProduct"

const breadCrumbs = [
    {
        name: "Home",
        route: "/",
    },
    {
        name: "All Products",
        route: "/products",
    },
    {
        name: "Detail",
        route: "",
    }
]

function ProductInfo() {
    return (
        <div style={{ backgroundColor: "#f4f5fb" }}>
            <Header />
            <BreadCrumb breadCrumbs={breadCrumbs} />
            <ProductDetail />
            <RelatedProject />
            <Footer />
        </div>
    )
}

export default ProductInfo;