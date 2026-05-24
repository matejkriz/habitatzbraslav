import "../styles.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

const truculenta = localFont({
  src: "../public/fonts/truculenta.ttf",
  variable: "--font-truculenta",
});

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main
      className={`${truculenta.variable} ${montserrat.variable} font-montserrat`}
    >
      <Component {...pageProps} />
    </main>
  );
};

export default App;
