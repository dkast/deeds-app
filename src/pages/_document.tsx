import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-white">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700&family=Sora:wght@600&display=swap"
            rel="stylesheet"
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
