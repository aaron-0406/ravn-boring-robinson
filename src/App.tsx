import ThemeContextProvider, { useThemeContext } from "./Context/ThemeToggle";
import UserContextProvider, { useUserContext } from "./Context/UserInfo";
import "./styles.css";
 
const DemoOne = () => {
  return (
    <div>
      <ThemeContextProvider>
        <ThemeSwitcher />
        <UserContextProvider>
          <MainLayout />
        </UserContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

const ThemeSwitcher = () => {
  const { toggleTheme } = useThemeContext();

  return <button onClick={toggleTheme}>Change theme</button>;
};

const MainLayout = () => {
  const { isLightMode, light, dark } = useThemeContext();
  const { name, addCar, updateCar, removeCar } = useUserContext();

  const theme = isLightMode ? light : dark;

  return (
    <div className="main" style={{ background: theme.bg }}>
      <div style={{ color: theme.text }}>{`Hello ${name}`}</div>
      <div>
        <button onClick={addCar}>Add Car</button>
        <button onClick={updateCar}>Update Car</button>
        <button onClick={removeCar}>Remove Car</button>
      </div>
    </div>
  );
};

export default DemoOne;

// https://github.com/facebook/react/issues/15156
