import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    bgTextColor: string;
    textColor: string;
    accentColor: string;
    cardBgColor: string;
    cardBorderColor: string;
    boardColor: string;
  }
}
