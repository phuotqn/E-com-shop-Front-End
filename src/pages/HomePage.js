import Header from "../components/Header-Footer/Header";
import BreadCrumb from "../components/Header-Footer/BreadCrumb";
import Slide from "../components/Header-Footer/Slider";
import RelatedProject from "../components/content/detail/RelatedProduct"
import HomeContent from "../components/content/Home";
import Footer from "../components/Header-Footer/Footer";

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


function HomePage() {
  return (
    <div style={{ backgroundColor: "#f4f5fb" }}>
      <Header />
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <Slide />
      <RelatedProject />
      <HomeContent />
      <Footer />
    </div>
  );
}

export default HomePage;
