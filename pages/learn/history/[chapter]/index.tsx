import type { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const chapter = String(ctx.params?.chapter || "");
  return { redirect: { destination: `/learn/history/${chapter}/1`, permanent: false } };
};
export default function Page() { return null; }
