import Header from "../components/Header-Footer/Header";
import BreadCrumb from "../components/Header-Footer/BreadCrumb";
import Cart from "../components/content/cart/Cart";
import Footer from "../components/Header-Footer/Footer";

const breadCrumbs = [
    {
        name: "Home",
        route: "/",
    },
    {
        name: "Cart",
        route: "",
    }
]

function CartPage() {
    return (
        <div style={{ backgroundColor: "#f4f5fb" }}>
            <Header />
            <BreadCrumb breadCrumbs={breadCrumbs} />
            <Cart />
            <Footer />
        </div>
    );
}

export default CartPage;