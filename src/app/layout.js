import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from "@/providers/AuthProvider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500','700'],
});

export const metadata = {
  title: "Code Chronicles",
  description: "Unveiling the Art of Web Development. Explore insightful tutorials, expert tips, and latest trends in coding and web design on our dedicated blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                    <Navbar/>
                    {children}
                    <Footer/>
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
