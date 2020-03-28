const JSZip = require("jszip")
const FileSaver = require('file-saver');
var zip = new JSZip();
const ConsoleApi = {
    page: "https://blog-console-api.csdn.net/v1/article/list?page=",
    article: "https://blog-console-api.csdn.net/v1/editor/getArticle?id="
}

const pageUrl = (num) => `${ConsoleApi.page}${num}`
const articleUrl = (id) => `${ConsoleApi.article}${id}`
var count = 1
async function nextPage(page){
    const url = pageUrl(page)
    let rsp = await (await fetch(url)).json()
    if(!rsp.data.list || rsp.data.list.length === 0) return
    if( rsp.code !== 200){
        alert("导出失败。未登录或API已变动。查看Console,前去提交issue吧")
    }
    //get all pack it
    let total = rsp.data.total
    for (info of rsp.data.list){
        const url = articleUrl(info.ArticleId)
        let rsp = await (await fetch(url)).json()
        const title = rsp.data.title.replace(/\/|\\/g,"_")
        zip.file(`${title}.md`, rsp.data.markdowncontent)
        document.title = `📦 [${count++}/${total}] 已打包`
    }
    
    await nextPage(page+1)
}

nextPage(1).then(rst => {
    zip.generateAsync({type:"blob"}).then(function(content) {
        FileSaver.saveAs(content, "csdn-blog-md.zip");
    });
})

