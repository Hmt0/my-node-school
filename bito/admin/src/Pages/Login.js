import React, {useState} from "react";
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin} from 'antd'
import '../static/Login.css'

function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const checkLogin = () => {
        setIsloading(true)
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