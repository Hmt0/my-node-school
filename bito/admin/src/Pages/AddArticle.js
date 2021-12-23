import React, {useState} from 'react'
import {marked} from 'marked'
import '../static/AddArticle.css'
import {Row, Col, Input, Selected, Button, DatePicker, Select} from 'antd'

const {Option} = Select
const {TextArea} = Input

function AddArticle() {
    const [articleId, setArticleId] = useState(0)
    const [articleTitle, setArticleTitle] = useState('')
    const [articleContent, setArticleContent] = useState('')
    const [markdownContent, setMarkdownContent] = useState('预览内容')
    const [introducemd, setIntroducemd] = useState('')
    const [introducehtml, setIntroducehtml] = useState('等待编辑')
    const [showDate, setShowDate] = useState('')
    const [updateDate, setUpdateDate] = useState('')
    const [typeInfo, setTypeInfo] = useState([])
    const [selectedType, setSelectType] = useState(1)

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

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                                placeholder='博客标题'
                                size='large'
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue='1' size='large'>
                                <Option value='1'>视频教程</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className='mk-content'
                                rows={35}
                                placeholder='文章内容'
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
                            <Button type='primary' size='large'>发布文章</Button>
                        </Col>
                        <Col span="24">
                            <br />
                            <TextArea
                                row={4}
                                placeholder='文章简介'
                                onChange={changeIntroduce}
                            ></TextArea>
                            <div className='introduce-html'
                                dangerouslySetInnerHTML={{__html: introducehtml}}
                            >
                                
                            </div>
                            <Col span={12}>
                                <div className='date-select'>
                                    <DatePicker 
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