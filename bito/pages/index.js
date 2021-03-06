import { useState } from "react"
import Head from 'next/head'
import Header from '../components/Header'
import { List } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import servicePath from "../config/aplUrl"
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import 'markdown-navbar/dist/navbar.css';

function Home(list) {
  const [blogList, setBlogList] = useState(list.data)

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm:true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Header />
        <List
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={blogList}
          renderItem={item => (
            <List.Item>
              <div className="blog-title">
                <Link href={{pathname: '/detailed', query: {id:item.id}}}>
                  <a>{item.title}</a>
                </Link>
              </div>
              <div className="blog-context"
                dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
              </div>
            </List.Item>
          )}
        />
      </main>
    </div>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
