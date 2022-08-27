const express = require("express")

const app = express()

// 表示在当前的express实例上设置一个变量
app.set("secret", "0123456789")

app.use(require("cors")())
// 为了能够使用客户端的req.body
app.use(express.json())
// 定义路由：静态文件托管上传文件夹，让uploads文件夹里面的所有文件可以通过/uploads路径来访问
app.use("/uploads", express.static(__dirname + "/uploads"))

require("./plugins/db.js")(app)
require("./routes/admin/index.js")(app)

app.listen(3000, () => {
	console.log("http://localhost:3000")
})
