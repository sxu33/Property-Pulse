import "@/aassets/styles/globals.css";
import Navbar from "@/components/Navbar";

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
      </body>
    </html>
  );
};

export default MainLayout;
