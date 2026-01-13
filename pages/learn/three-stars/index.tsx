import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/learn/three-stars/1", permanent: false },
  };
};

export default function Page() {
  return null;
}
