import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../utils/createEmotionCache";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { AppProvider } from "../contexts/AppContext";
import "../styles/global.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Box
            sx={{
              minHeight: "100vh",
              height: "100%",
              backgroundColor: "secondary.dark",
              color: "#fff",
            }}
          >
            <Header />
            <Container component="main" sx={{ flex: 1 }}>
              <Component {...pageProps} />
            </Container>
          </Box>
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
