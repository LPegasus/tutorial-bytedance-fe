import App from 'next/app';
import { RecoilRoot } from 'recoil';

import { ThemeProvider, Box } from '@material-ui/core';
import { BottomBar } from '@src/BottomBar';
import { AppBar } from '@src/AppBar';
import { useGlobalStyle } from '@src/GlobalStyle';
import { theme } from '@src/theme';

export default function MyApp({ Component, pageProps }) {
  useGlobalStyle();
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Box pt="48px">
          <Component {...pageProps} />
        </Box>
        <BottomBar />
      </ThemeProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
