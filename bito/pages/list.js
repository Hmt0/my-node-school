import React, { useState, useEffect } from "react"
import Head from 'next/head'
import Header from '../components/Header'
import { Breadcrumb, List } from 'antd'
import Link from "next/dist/client/link"

import axios from "axios"
import servicePath from "../config/aplUrl"

function BlogList(list) {
  const [blogList, setBlogList] = useState(list.data)
  // 动态获取数据
  useEffect(() => {
    setBlogList(list.data)
  })
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
            <Breadcrumb.Item>视频列表</Breadcrumb.Item>
          </Breadcrumb>
      </div>
      <main>
        <Header />
        <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={blogList}
            renderItem={item => (
            <List.Item>
                <div className="blog-title">
                  <Link href={{pathname:'/detailed', query: {id:item.id}}}>
                    <a> {item.title} </a>
                  </Link>
                </div>
                <div className="blog-context">{item.context}</div>
                <div>{item.addTime}</div>
                <div>{item.type_id}</div>
                <div>{item.view_count}</div>
                <div>{item.introduce}</div>
            </List.Item>
            )}
        />
      </main>
    </div>
  )
}

BlogList.getInitialProps = async (context)=>{
  let id = context.query.id
   const promise = new Promise((resolve)=>{
    axios(servicePath.getListById + id).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default BlogList
