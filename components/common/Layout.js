import Head from "next/head";

export default function Layout({ metaTitle, metaDescription, metaImage, children }) {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reviewr_ai" />
        <meta name="twitter:url" content="https://baqpa.com" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JLM4LWPM0T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}
        gtag("js", new Date());
        gtag("config", "G-JLM4LWPM0T");
    `,
          }}
        ></script>
      </Head>
      <div className="h-screen flex flex-col bg-gray-300">
        <div className="flex flex-grow w-screen overflow-hidden max-w-7xl m-auto bg-gray-100">
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </>
  );
}
