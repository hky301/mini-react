# mini-react
实现 mini-react

## 第六天
# 实现 useState
哇，今天这一节太好理解了，看一遍就懂了，终于不烧脑了。
优化点：检测需要不需要做更新
const [obj, setObj] = React.useState({a: 1})
点击后执行 setObj(() => ({a: 1}))，setObj  内函数返回是一个新对象，但是对象里面的值都是一样的，应该也不走更新

# 批量执行 action

# 优化点
检测需要不需要做更新
