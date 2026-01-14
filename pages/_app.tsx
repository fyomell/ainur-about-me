import LearnFloatingPanel from "../components/LearnFloatingPanel";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (<>\n      <Component {...pageProps} />;
}
