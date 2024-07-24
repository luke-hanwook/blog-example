import Layout from "@components/layout";
import "../styles/global.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useReportWebVitals } from "next/web-vitals";
import ErrorBoundary from "@components/errorBoundary";

// 1. Persisting layout between page changes
// 2. Keeping state when navigating pages
// 3. Custom error handling using componentDidCatch
// 4. Inject additional data into pages
// 5. Add global CSS

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [visitedTime] = useState(new Date());

  // measure perfomance
  // https://nextjs.org/docs/pages/building-your-application/optimizing/analytics
  useReportWebVitals((metric) => {
    console.log("metric", metric);
  });

  return (
    <Layout home={router.pathname === "/"}>
      <div>visited: {format(visitedTime, "yyyy-MM-dd")}</div>
      <div>
        visited:{" "}
        {formatDistanceToNow(new Date(visitedTime), {
          addSuffix: true,
          includeSeconds: true,
        })}
      </div>
      <ErrorBoundary>
        <Component {...pageProps} pathname={router.pathname} />
      </ErrorBoundary>
    </Layout>
  );
}
