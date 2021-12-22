import React, {useState} from 'react'
import {marked} from 'marked'
import '../static/AddArticle.css'
import {Row, Col, Input, Selected, Button, DatePicker, Select} from 'antd'

const {Option} = Select
const {TextArea} = Input

function AddArticle() {
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
                            />
                        </Col>
                        <Col span={12}>
                            <div className='show-html'>
                                内容预览
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                </Col>
            </Row>

        </div>
    )
}

export default AddArticle