import React, { useState, useEffect} from "react"
import { useNavigate } from "react-router"
import { List, Row, Col, Modal, message, Button } from "antd"
import axios from "axios"
import servicePath from '../config/apiUrl'

const {confirm} = Modal

function ArticleList(props) {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }
    // 删除文章
    const delArticle = (id) => {
        confirm({
            title:'确认要删除这篇文章吗？',
            content: '点击OK按钮删除',
            onOk() {
                axios(servicePath.delArticle + id, {withCredentials: true}).then(
                    res => {
                        message.success('文章删除成功')
                        getList()
                        // 如果是前台数据并发量很大的时候，应该修改前端而不是重新获取数据
                    }
                )
            },
            onCancel(){
                message.success('文章没有任何变化')
            }

        })
    }

    // 修改文章的跳转方法
    const updateArticle = (id, checked) => {
        navigate('/index/add')
    }

    return (
        <div>
            <List 
                header = {
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                         <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                                {item.viewCount}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>
                                <Button onClick={() => {delArticle(item.id)}}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList
