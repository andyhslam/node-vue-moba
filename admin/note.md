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