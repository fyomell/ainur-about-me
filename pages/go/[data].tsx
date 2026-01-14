import type { GetServerSideProps } from "next";

function b64urlToStr(s: string) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const raw = atob(b64);
  return decodeURIComponent(escape(raw));
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = String(ctx.params?.data || "");
  try {
    const url = b64urlToStr(data);
    if (!/^https?:\/\//i.test(url)) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return { redirect: { destination: url, permanent: false } };
  } catch {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default function Go() {
  return null;
}
