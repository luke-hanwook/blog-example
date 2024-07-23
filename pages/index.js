import Head from "next/head";
import { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";

import { getSortedPostsData } from "../lib/posts";
// import { useState, useEffect } from "react";

// ssg, ssr
// csr - fs는 서버사이드에서만 가능하여 => api routes 활용
// ssg, ssr에서 api routes 시 주소는 절대 경로 표시

export async function getServerSideProps() {
  const allPostsData = getSortedPostsData();

  // api route 요청은 client-side에서만. -> 서버 사이드에서 사용 시 중복 코드임..
  // const res = await fetch("http://localhost:3000/api/posts");
  // const { allPostsData } = await res.json();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([]);

  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((res) => res.json())
  //     .then((json) => setAllPostsData(json.allPostsData));
  // }, []);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
