import Navbar from "../../components/Navbar/Navbar";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <ProductCarousel />
      <InstaCarousel />
    </div>
  );
}
