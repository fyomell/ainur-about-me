import type { AppProps } from "next/app";
import "@/styles/globals.css";
import LearnFloatingPanel from "@/components/LearnFloatingPanel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <LearnFloatingPanel />
    </>
  );
}
