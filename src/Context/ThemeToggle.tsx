import { createContext, useContext, useState } from "react";
import { IThemeContext } from "../interfaces/Theme";

const initialState: IThemeContext = {
  isLightMode: false,
  light: { bg: "white", text: "black" },
  dark: { bg: "black", text: "white" },
};

export const ThemeContext = createContext<IThemeContext>(initialState);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("You can't use the themecontext outside of the provider");
  }
  return context;
};

const ThemeContextProvider = ({ children }: { children: JSX.Element[] }) => {
  const [theme, setTheme] = useState(initialState);

  const toggleTheme = () => {
    setTheme((state) => {
      return {
        ...state,
        isLightMode: !state.isLightMode,
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
