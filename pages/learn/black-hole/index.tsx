import type { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: "/learn/black-hole/1", permanent: false },
});
export default function RedirectPage() { return null; }
