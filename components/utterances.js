import React from "react";

function Utterances() {
  //     <script src="https://utteranc.es/client.js"
  //         repo="luke-hanwook/blog-example"
  //         issue-term="pathname"
  //         theme="github-light"
  //         crossorigin="anonymous"
  //         async>
  //     </script>
  return (
    <section
      ref={(elem) => {
        if (!elem) return;
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://utteranc.es/client.js";
        scriptElement.async = true;
        scriptElement.crossOrigin = "anonymous";
        scriptElement.setAttribute("repo", "luke-hanwook/blog-example");
        scriptElement.setAttribute("issue-term", "pathname");
        scriptElement.setAttribute("theme", "github-light");
        elem.appendChild(scriptElement);
      }}
    />
  );
}

export default React.memo(Utterances);
