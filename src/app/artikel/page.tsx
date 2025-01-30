import CardArtikel from "@/components/artikel/CardArtikel";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Artikel () {
  return (
    <div>
      <Navbar />
      <div>
        <CardArtikel />
      </div>
      <Footer />
    </div>
  );
}