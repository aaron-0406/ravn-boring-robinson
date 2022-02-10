//ILightDark
// I -> Interface 

export interface ILightDark {
  bg: string;
  text: string;
}

export interface IThemeContext {
  isLightMode: boolean;
  light: ILightDark;
  dark: ILightDark;
  toggleTheme?: () => void;
}
