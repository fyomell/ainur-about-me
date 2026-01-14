import { GetStaticPaths, GetStaticProps } from "next";
import BookPageView from "../../../../components/book/BookPageView";
import { BOOKS } from "../../../../lib/book/books";

export const getStaticPaths: GetStaticPaths = async () => {
  const book = BOOKS["history:british-empire"];
  const paths = book.pages.map((_, i) => ({ params: { page: String(i + 1) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const p = parseInt(String(ctx.params?.page || "1"), 10);
  return { props: { page: Number.isFinite(p) ? p : 1 } };
};

export default function Page(props: { page: number }) {
  const book = BOOKS["history:british-empire"];
  const pageIndex = Math.max(0, Math.min(book.pages.length - 1, props.page - 1));
  return <BookPageView book={book} pageIndex={pageIndex} basePath="/learn/history/british-empire" />;
}
