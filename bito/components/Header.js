import React from 'react'
import styles from '../styles/components/Header.module.css'
import {Row, Col, Menu} from "antd"
import { HomeOutlined } from "@ant-design/icons"

const Header = () => (
    <div className={styles.header}>
        <Row type="flex" justify="center">
            <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                <span className="header-logo">贺梦婷</span>
                <span className="header-txt">记录学习</span>
            </Col>
            <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu>
                    <Menu.Item key="home">
                        <HomeOutlined />
                        首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header