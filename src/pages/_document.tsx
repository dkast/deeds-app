import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-[#33335C]">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700&family=Sora:wght@600&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta
            name="theme-color"
            content="#000000"
            media="(prefers-color-scheme: dark)"
          ></meta>
          <meta
            name="theme-color"
            content="#ffffff"
            media="(prefers-color-scheme: light)"
          ></meta>
          <link rel="manifest" href="/static/manifest.json" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
        </Head>
        <body className="h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
