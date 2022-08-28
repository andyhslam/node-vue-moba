# 管理后台的笔记
1. native表示监听el-form的原生表单事件；prevent表示阻止表单的默认提交，不要跳转页面
```html
<el-form @submit.native.prevent="login">
  <el-form-item>
    <el-button type="primary" native-type="submit">登录</el-button>
  </el-form-item>
</el-form>
```

2. 实现父子分类
- 逻辑上的父子级关系，实际上在数据库还是平级的关系，只是有几个字段表示它的父级，
从而形成一个链式结构，就可以实现无限层级的分类。

# web前端
1. 样式重置
- 默认的盒模型以内容为主，设置宽度为100%，那就是内容宽度为100%。如果再加上padding和border，就会把自己撑大。
  加上box-sizing: border-box表示以边框为准，这样子再加上padding和border，不会把自己撑大，而是把内容挤压。
- rem的基本单位是html根元素定义的字体大小
- font-family: Arial, Helvetica, sans-serif;
表示使用字体的先后顺序：有Arial用它，没Arial用Helvetica，没Helvetica就用sans-serif
Arial：几乎所有电脑都有的字体；Helvetica：苹果设备字体；sans-serif：非称线字体(主流设备使用)
- line-height: 1.2em;表示当前行的字体高度1.2倍
