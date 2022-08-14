const express = require("express")

const app = express()

app.use(require("cors")())
// 为了能够使用客户端的req.body
app.use(express.json())

require("./plugins/db.js")(app)
require("./routes/admin/index.js")(app)

app.listen(3000, () => {
	console.log("http://localhost:3000")
})
