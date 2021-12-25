import React, {useState} from "react";
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin, message} from 'antd'
import '../static/Login.css'
import servicePath from "../config/apiUrl";
import axios from 'axios'
import { useHistory } from "react-router";

function Login({...props}) {
    console.log('000', props)
    let history = useHistory();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const checkLogin = () => {
        setIsloading(true)
        if(!userName) {
            message.error('用户名不能为空')
            setTimeout(() => setIsloading(false), 500)
            return false
        } else if(!password) {
            message.error('密码不能为空')
            setTimeout(() => setIsloading(false), 500)
            return false            
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }

        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true // 共享session？？？
        }).then(
            res => {
                setIsloading(false)
                console.log(res.data.data)
                if(res.data.data === '登录成功') {
                    localStorage.setItem('openId', res.data.openId)
                    props.history.push('/index')
                    message.success('登录成功')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )
        setTimeout(() => {
            setIsloading(false)
        }, 1000)
    }

    return (
        <div className="login-div">
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title="HMTBlog System" bordered={true} style={{width: 400}}>
                    <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        // prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}} />}
                        onChange={(e) => {setUserName(e.target.value)}}
                    />
                    <br /><br/>
                    <Input 
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        type="key"
                        // prefix={<Icon type="key" style={{color: 'rgba(0, 0, 0, .25)'}} />}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <br /><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>login</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login