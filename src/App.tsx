import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, gradientTheme, lightTheme } from './theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom, isGradientAtom } from './atoms';
import { Helmet } from 'react-helmet-async';

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    background: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = styled.header`
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnGroup = styled.div`
  display: flex;
`;

const ToggleBtn = styled.button`
  cursor: pointer;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.3s;
`;

const ToggleGradientBtn = styled(ToggleBtn)`
  background: transparent;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  &:hover {
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.cardBgColor};
  }
`;

const ToggleDarkBtn = styled(ToggleBtn)`
  background: transparent;
  color: ${(props) => props.theme.accentColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  &:hover {
    background: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.textColor};
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const isGradient = useRecoilValue(isGradientAtom);
  const gradientAtom = useRecoilValue(isGradientAtom);
  const setGradientAtom = useSetRecoilState(isGradientAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleGradientAtom = () => setGradientAtom((prev) => !prev);
  const toggleDarkAtom = () => {
    if (!gradientAtom) setDarkAtom((prev) => !prev);
  };
  return (
    <>
      <Helmet>
        <link
          rel="import"
          href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css)"
        />
      </Helmet>

      <ThemeProvider
        theme={isGradient ? gradientTheme : isDark ? darkTheme : lightTheme}
      >
        <Header>
          <BtnGroup>
            <ToggleGradientBtn onClick={toggleGradientAtom}>
              Gradient {!gradientAtom ? 'On' : 'Off'}
            </ToggleGradientBtn>
            {!gradientAtom && (
              <ToggleDarkBtn onClick={toggleDarkAtom}>
                Dark {!isDark ? 'On' : 'Off'}
              </ToggleDarkBtn>
            )}
          </BtnGroup>
        </Header>

        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
