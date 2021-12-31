import React, {useEffect, useState} from 'react'
import styles from '../styles/components/Header.module.css'
import {Row, Col, Menu} from "antd"
import { HomeOutlined } from "@ant-design/icons"
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/aplUrl'

const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }

        fetchData()
    }, [])

    const handleClick = (e) => {
        if(e.key === 0) {
            Router.push('/index')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }

    return(
        <div className={styles.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <span className="header-logo">贺梦婷</span>
                    <span className="header-txt">记录学习</span>
                </Col>
                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu onClick={handleClick}>
                        <Menu.Item key={0}>
                            <HomeOutlined />
                            首页
                        </Menu.Item>
                        {navArray.map((item) => {
                            return (
                                <Menu.Item key={item.Id}>
                                    {item.typeName}
                                    {item.Id}
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header