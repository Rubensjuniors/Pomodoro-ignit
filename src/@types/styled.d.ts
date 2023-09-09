import "styled-components";
import { defaultTheme } from "../styles/thames/default";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
