import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "property pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
