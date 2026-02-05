import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Providers } from "./components/Provider";

const mont = localFont({
  src: [
    { path: "../../public/fonts/Mont-Regular.otf", weight: "400" },
    { path: "../../public/fonts/Mont-SemiBold.otf", weight: "500" },
    { path: "../../public/fonts/Mont-Bold.otf", weight: "700" },
  ],

  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "Nice Gadgets",
  description:
    "Welcome to Nice Gadgets store - mobile phones, tablets and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mont.variable}>
        <Providers>
          <div className="App">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
