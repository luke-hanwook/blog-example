import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyle from "../../styles/utils.module.css";
import Head from "next/head";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  //  const paths = [
  //     {
  //       params: {
  //         id: 'ssg-ssr'
  //       }
  //     }
  //   ]

  return {
    paths,
    fallback: false,
    // path에는 없지만 데이터는 존재해야함(getStaticProps로 가져올 수 있어야 함.)
    // true => 빌드할때에는 없었는데 production에서 next가 제너레이션 (빌드시 생성되지 않은 page에 대한 처리)
    // blocking => true와 같지만 fallback을 거치지 않음
    // false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingXl}>{postData.title}</h1>
        <div className={utilStyle.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
