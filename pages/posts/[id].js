import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyle from "../../styles/utils.module.css";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import CodeBlock from "../../components/codeblock";
// import Button from "../../components/button";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("../../components/button"), {
  loading: () => <div>Loading...</div>,
});

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

export async function getStaticProps({ params, preview }) {
  console.log(`>>> ${preview}`);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const components = {
  Button,
  CodeBlock,
};

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
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </Layout>
  );
}
