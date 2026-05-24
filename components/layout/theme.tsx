import * as React from "react";
import GlobalData from "../../content/global/index.json";

export type ThemeColor =
  | "blue"
  | "teal"
  | "green"
  | "red"
  | "pink"
  | "purple"
  | "orange"
  | "yellow";

export type ThemeData = {
  color: ThemeColor;
  font: string;
  darkMode: string;
};

type ThemeInput = {
  color?: string | null;
  font?: string | null;
  darkMode?: string | null;
};

const ThemeContext = React.createContext<ThemeData>(GlobalData.theme as ThemeData);

export const useTheme = () => React.useContext(ThemeContext);

const updateRenderColorMode = (themeMode: "dark" | "light") => {
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.remove("light");
    root.classList.add(themeMode);
  }
};

const getUserSystemDarkMode = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};

type ThemeProps = {
  data?: ThemeInput | null;
  children: React.ReactNode;
};

export const Theme = ({ data, children }: ThemeProps) => {
  const [systemDarkMode, setSystemDarkMode] = React.useState(
    getUserSystemDarkMode()
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

      const updateSystemMediaPreference = (event: MediaQueryListEvent) => {
        setSystemDarkMode(event.matches ? "dark" : "light");
      };

      userMedia.addEventListener("change", updateSystemMediaPreference);

      return () =>
        userMedia.removeEventListener("change", updateSystemMediaPreference);
    }
    return;
  }, [setSystemDarkMode]);

  const color = data?.color ?? "yellow";
  const font = data?.font ?? "sans";
  const darkMode = data?.darkMode ?? "system";

  React.useEffect(() => {
    updateRenderColorMode(
      darkMode === "system"
        ? systemDarkMode
        : darkMode === "dark" || darkMode === "light"
        ? darkMode
        : "light"
    );
  }, [systemDarkMode, darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        color: color as ThemeColor,
        font,
        darkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
