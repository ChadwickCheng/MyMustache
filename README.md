# 动手实现简单的不考虑各种边界的mustache

## 请掌握最基本的webpack使用

## 先导知识
1. mustache渲染模板的几种方式
2. tokens

### tokens:
```
模板字符串
<h1>我买了一个{{ thing}}好{{mood}}啊</h1>
tokens
[
  ["text","<h1>我买了一个"],
  ["name","thing"],
  ["text","好"]，
  ["name","mood"],
  ["text","啊</h1>"]
]
```

## 大纲
1. 将模板字符串解析为tokens
2. 结合数据生成真实dom