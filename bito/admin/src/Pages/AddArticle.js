import React, {useState, useEffect} from 'react'
import {marked} from 'marked'
import '../static/AddArticle.css'
import {Row, Col, Input, Selected, Button, DatePicker, Select, message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { useNavigate } from 'react-router'

const {Option} = Select
const {TextArea} = Input


function AddArticle(props) {
    const [articleId, setArticleId] = useState(0) // 文章ID，如果是0说明是新增，如果不是0说明是修改
    const [articleTitle, setArticleTitle] = useState('')
    const [articleContent, setArticleContent] = useState('')
    const [markdownContent, setMarkdownContent] = useState('预览内容')
    const [introducemd, setIntroducemd] = useState('')
    const [introducehtml, setIntroducehtml] = useState('等待编辑')
    const [showDate, setShowDate] = useState('')
    const [updateDate, setUpdateDate] = useState('')
    const [typeInfo, setTypeInfo] = useState([])
    const [selectedType, setSelectType] = useState(1)
    const navigate = useNavigate()

    useEffect(() => { 
        getTypeInfo()
        let tmpId = 0
        if(tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    }, [])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true
        }).then(
            res => {
                if(res.data.data === '没有登录') {
                    localStorage.removeItem('openId')
                    // navigate('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    const selectTypeHandler = (value) => {
        setSelectType(value)
    }

    const saveArticle = () => {
        if(!selectedType) {
            message.error('必须选择文章类型')
            return false
        } else if(!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if(!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if(!introducemd) {
            message.error('文章简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let dateText = showDate.replace('-', '/')
        dataProps.addTime =(new Date(dateText).getTime())/1000

        if(articleId === 0) {
            dataProps.view_count = 0
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess) {
                        message.success('文章添加成功')
                    } else {
                        message.error('文章添加失败')
                    }
                }
            )
        } else {
            dataProps.Id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if(res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败')
                    }
                }
            )
        }
    }

    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true
        }).them(
            res => {
                let articleInfo = res.data.data[0]
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.article_content)
                let html = marked(articleInfo.article_content)
                setMarkdownContent(html)
                setIntroducemd(articleInfo.introduce)
                let tmpInt = marked(articleInfo.introduce)
                setIntroducehtml(tmpInt)
                setShowDate(articleInfo.addTime)
                setSelectType(articleInfo.type_id)
            }
        )
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                                value={articleTitle}
                                placeholder='博客标题'
                                size='large'
                                onChange={e => {setArticleTitle(e.target.value)}}
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size='large' onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className='mk-content'
                                rows={35}
                                placeholder='文章内容'
                                value = {articleContent}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className='show-html'
                                dangerouslySetInnerHTML={{__html: markdownContent}}
                            >
                                
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span="24">
                            <Button size='large'>暂存文章</Button>
                            <Button type='primary' size='large' onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span="24">
                            <br />
                            <TextArea
                                row={4}
                                placeholder='文章简介'
                                value = {introducemd}
                                onChange={changeIntroduce}
                            ></TextArea>
                            <div className='introduce-html'
                                dangerouslySetInnerHTML={{__html: introducehtml}}
                            >
                                
                            </div>
                            <Col span={12}>
                                <div className='data-select'>
                                    <DatePicker 
                                        onChange = {(data, dataString) => {setShowDate(dataString)}}
                                        placeholder='发布日期'
                                        size='large'
                                    />
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default AddArticle