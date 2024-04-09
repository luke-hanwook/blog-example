import Head from "next/head";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>첫번째 글</title>
      </Head>
      <h1>first post</h1>
    </Layout>
  );
}
