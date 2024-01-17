# mini-react
实现 mini-react

## 第五天
### 实现事件绑定
相对比较简单，利用原生的 js 绑定事件，要注意props key 是以 on 开头的

### 实现更新 props
思考： count变量 写在组件外面，是全局变量，更新时，vdom 树会重新构建，获取到值就是更新过后的值了。如果写在组件里面，构建vdom 时， count 重新初始化了，又回到原来的值，新老 props 值是一样，页面上的数据没有变化。

initChildren 改名 reconcileChildren，reconcile 这个词都没见过，还得多积累点词汇量啊
