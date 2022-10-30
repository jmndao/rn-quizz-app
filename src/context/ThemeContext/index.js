import React from "react";
import { useColorScheme } from "react-native";
import { ligthTheme, darkTheme } from "../../constants";

const ThemeContext = React.createContext(null);

const ThemeProvider = ({ children }) => {
  const scheme = useColorScheme();

  // Light Theme is set as the default theme
  const [curTheme, setCurTheme] = React.useState(ligthTheme);
  const [curThemeValue, setCurThemeValue] = React.useState(scheme);

  const changeTheme = React.useCallback(() => {
    if (curThemeValue === "light") {
      setCurThemeValue("dark");
    } else {
      setCurThemeValue("light");
    }
  }, [curThemeValue]);

  React.useEffect(() => {
    setCurTheme(curThemeValue === "dark" ? darkTheme : ligthTheme);
  }, [curThemeValue]);

  return (
    <ThemeContext.Provider
      value={{
        curTheme,
        changeTheme,
        curThemeValue
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => React.useContext(ThemeContext);
