import React from "react";
import Head from "next/head";
import { Nav } from "./nav";
import { Footer } from "./footer";
import layoutData from "../content/global/index.json";
import { Theme } from "./theme";

export const Layout = ({ rawData = "", data = layoutData, children }) => {
  return (
    <>
      <Head>
        <title>Tina</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Theme data={data?.theme}>
        <div className="min-h-screen flex flex-col">
          <Nav data={data?.nav} />
          <div className="flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col">
            {children}
          </div>
          <Footer rawData={rawData} data={data?.footer} />
        </div>
      </Theme>
    </>
  );
};

export const layoutQueryFragment = `
  getGlobalDocument(relativePath: "index.json") {
    data {
      nav {
        href
        label
      }
      footer {
        facebook
        twitter
        instagram
        github
      }  
      theme {
        color
      }
    }
  }
`;