import "@/aassets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "property pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
};

export default MainLayout;
