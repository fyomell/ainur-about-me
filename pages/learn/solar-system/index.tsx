import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/learn/solar-system/1",
      permanent: false,
    },
  };
};

export default function RedirectPage() {
  return null;
}
