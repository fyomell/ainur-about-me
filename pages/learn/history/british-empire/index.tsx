export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/learn/history/british-empire/1",
      permanent: false,
    },
  };
}

export default function Redirect() {
  return null;
}
