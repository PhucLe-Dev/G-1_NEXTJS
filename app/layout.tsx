"use client";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import "./globals.css";
import TopHeader from "./Components/HeaderComponent/TopHeaderCompn";
import MainHeader from "./Components/HeaderComponent/MainHeaderComponent";
import Nav from "./Components/NavCompn";
import Footer from "./Components/FooterCompn";
import { GlobalStateProvider } from "./Components/HeaderComponent/GlobalStateContext";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className="app text-[62.5%] bg-[#f5f5f5]">
            <GlobalStateProvider>
              <header className="bg-gradient-to-t from-[#f5412d] to-[#fe6532] text-white text-sm">
                <div className="topHeader">
                  <div className="w-5/6 m-auto">
                    <TopHeader />
                  </div>
                </div>
                <div className="mainHeader w-5/6 mx-auto">
                  <MainHeader />
                </div>
                <div className="mainHeader w-5/6 m-auto">
                  <Nav />
                </div>
              </header>
              <main className="m-h-[300px] w-5/6 mt-6 mx-auto">
                {children}
              </main>
            </GlobalStateProvider>
            <footer className="bg-gray-100 mt-6">
              <hr className="border-none h-1 bg-[#f5412d]" />
              <div className="topFooter w-5/6 m-auto">
                <Footer />
              </div>
            </footer>
          </div>
        </body>
      </html>
    </Provider>
  );
}
