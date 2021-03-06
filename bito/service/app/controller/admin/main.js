'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = "SELECT userName FROM admin_user WHERE userName = '" + 
            userName + "' AND password = '" + password + "';"
        const res = await this.app.mysql.query(sql)
        if(res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId': openId}
            this.ctx.body = {'data': '登录成功', 'openId':openId}
        } else {
            this.ctx.body = {'data': '登录失败'}
        }
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        console.log(resType)
        this.ctx.body = {data: resType}
    }

    async addArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    async index() {
        this.ctx.body = {
            data: 'hi'
        }
    }

    async updateArticle() {
        let tempArticle = this.ctx.request.body

        const result = await this.app.mysql.update('article', tempArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    async getArticleList() {
        let sql = 'SELECT article.Id as id ,' +
              'article.title as title ,' + 
              'article.introduce as introduce ,' + 
              'article.addTime as addTime ,' + 
              'article.view_count as view_count ,' + 
              'type.typeName as typeName ' + 
              'FROM article LEFT JOIN type ON article.type_id = type.id ' + 
              'ORDER BY article.id DESC' // 倒序排列
        const resList = await this.app.mysql.query(sql)
        this.ctx.body = {list: resList}
    }

    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', {'id': id})
        this.ctx.body = {data: res}
        
    }

    async getArticleById() {
        let id = this.ctx.params.id
        const sql = 'SELECT article.Id as id ,' +
        'article.title as title ,' + 
        'article.introduce as introduce ,' + 
        "FROM_UNIXTIME(article.addTime, '%Y-%m-%d) as addtime ,"
        'article.view_count as view_count ,' + 
        'type.typeName as typeName ' + 
        'type.id as typeId ' +
        'FROM article LEFT JOIN type ON article.type_id = type.id ' + 
        'WHERE article.id = ' + id

        const reault = await this.app.mysql.query(sql)
        this.ctx.body = {data: result}
    }
}

module.exports = MainController