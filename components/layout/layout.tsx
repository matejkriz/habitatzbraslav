import React from "react";
import Head from "next/head";
import Script from 'next/script'
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";

export const Layout = ({  data = layoutData, children }) => {
  return (
    <>
      <Head>
        <title>Habitat</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Habitat Zbraslav - Dětská vzdělávací skupina" key="desc" />
        <meta property="og:title" content="Habitat Zbraslav - Dětská vzdělávací skupina" />
        <meta
          property="og:description"
          content="Jsme skupina rodičů, která se potkala v lesní školce v Praze na Zbraslavi. Spojuje nás snaha najít vlídné prostředí pro naše vlastní děti, kde budou mít možnost pokračovat přirozeně v procesu poznávání světa."
        />
        <meta
          property="og:image"
          content="/images/habitat.png"
        />
        {data.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FM9PMWJFPE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FM9PMWJFPE');
        `}
      </Script>
      <Theme data={data?.theme}>
        <div className={`flex min-h-screen flex-col font-${data.theme.font}`}>
          <Header data={data?.header} />
          <div
            className={`font-${data.theme.font} flex flex-1 flex-col bg-white text-green-900 dark:bg-gray-900 `}
          >
            {children}
          </div>
          <Footer
            data={data?.footer}
            logo={data?.header.logo}
          />
        </div>
      </Theme>
    </>
  );
};
