let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin', // 检查用户名和密码
    getTypeInfo: ipUrl + 'getTypeInfo', // 检查用户名和密码
    addArticle: ipUrl + 'addArticle', // 添加文章
    updateArticle: ipUrl + 'updateArticle', // 修改文章
    getArticleList: ipUrl + 'getArticleList', // 文章列表
}

export default servicePath