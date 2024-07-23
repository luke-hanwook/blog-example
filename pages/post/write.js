import { useRef, useState } from "react";
import Link from "next/link";

function Write() {
  const idRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const [showLink, setShowLink] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch("/api/post/write", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          // fetch() promise는 HTTP 에러에 의해 reject 되지 않음
          throw new Error("Fetch Error");
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message);
        })
        .catch((error) => alert(`request error: ${error}`));
    }
  };

  return (
    <>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="ID" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="TITLE"
          required
          ref={titleRef}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="CONTENT"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>Created Post Link</Link>
      )}
    </>
  );
}

export default Write;
