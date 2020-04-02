import App from 'next/app'
import Link from 'next/link'

export default class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <Link href={'/index'}>
          <a>首页</a>
        </Link>
        <Link href={'/repos?page=1'} as='/repos/1'>
          <a>仓库页</a>
        </Link>
        <Component {...pageProps} />
        <Link href={'/repos?page=1'}>
          <a>仓库页1</a>
        </Link>
        <Link href={'/repos?page=2'} as='/repos/2'>
          <a>仓库页2</a>
        </Link>
        <Link href={'/repos?page=3'} as='/repos/3'>
          <a>仓库页3</a>
        </Link>
        <style> {`
          a {
            display: inline-block;
            padding: 0 20px;
          }
          `} </style>
      </div>
    )
  }
}