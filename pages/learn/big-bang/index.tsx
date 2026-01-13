import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/learn/big-bang/1",
      permanent: false,
    },
  };
};

export default function RedirectPage() {
  return null;
}
