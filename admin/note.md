# 管理后台的笔记

1. native 表示监听 el-form 的原生表单事件；prevent 表示阻止表单的默认提交，不要跳转页面

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

# web 前端

1. 样式重置

- 默认的盒模型以内容为主，设置宽度为 100%，那就是内容宽度为 100%。如果再加上 padding 和 border，就会把自己撑大。
  加上 box-sizing: border-box 表示以边框为准(只对宽度起作用)，这样子再加上 padding 和 border，不会把自己撑大，而是把内容挤压。
- rem 的基本单位是 html 根元素定义的字体大小
- font-family: Arial, Helvetica, sans-serif;
  表示使用字体的先后顺序：有 Arial 用它，没 Arial 用 Helvetica，没 Helvetica 就用 sans-serif
  Arial：几乎所有电脑都有的字体；Helvetica：苹果设备字体；sans-serif：非称线字体(主流设备使用)
- line-height: 1.2em;表示当前行的字体高度 1.2 倍
- scss 语法：

```css
/* colors */
$colors: (
  'primary': #db9e3f,
  'light': #f9f9f9,
);

/* text方式一 */
$text: (left, center, right);
@each $var in $text {
  .text-#{$var} {
    text-align: $var;
  }
}
/* text方式二 */
@each $var in (left, center, right) {
  .text-#{$var} {
    text-align: $var;
  }
}

/**
 * $text: ();和 $colors: ();
 * 变量对应的括号里面的值可以是数组结构(1, 2, 3)，也可以是map结构(a:1, b:2, c:3)。
 */
```

2. 字体图标的原理

- 把每个图标都当成一个字符，最终打包到字体文件里面；其实就是一个个文字，只不过文字长得像字体图标。
  它也是个字体，只不过这个字体是画出来的图标。

3. 首页英雄列表-提取官网数据

```js
$$('.hero-nav li').map((el, i) => {
  return {
    name: el.innerText,
    heroes: $$('li', $$('.hero-list')[i]).map((hero) => {
      return {
        name: $$('h3', hero)[0].innerHTML,
        avatar: $$('img', hero)[0].src,
      }
    }),
  }
})
```

# Ubuntu 操作系统的命令

- apt update
- apt list --upgradable
- apt show nginx
- apt install nginx -y
- firewall-cmd --zone=public --add-port=80/tcp --permanent
- systemctl restart firewalld

1. Ubuntu 22.04 安装 Mongodb
   https://blog.csdn.net/majiayu000/article/details/126491116
2. Ubuntu20.04 安装 MongoDB 及其基本使用
   https://blog.csdn.net/yutu75/article/details/110941936
3. Ubuntu 下 MongoDB 安装与使用教程
   http://dblab.xmu.edu.cn/blog/mongodb/
4. 在 Ubuntu 22.04 上安装 MongoDB
   https://www.xtuos.com/5757.html
