import "../styles/globals.css";
import { EditorProvider, GalleryProvider } from "../Context";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Session from "next-auth";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
interface Props {
  session?: typeof Session | null;
}
nProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }: AppProps<Props>) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <EditorProvider>
          <GalleryProvider>
            <Component {...pageProps} />
          </GalleryProvider>
        </EditorProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
