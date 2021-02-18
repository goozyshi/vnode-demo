## node + express + MySQL

```bash
cnpm i -S express
cnpm i -S nodemon
cnpm i -S boom
cnpm i -S cors
cnpm i -S body-parser
cnpm i -S mysql
```

## express 三大概念
### 中间件

中间件是一个**函数**，在请求和响应周期中被顺序调用。

```javascript
const myLogin = (req, res, next) => {
  res.send(`登录成功`)
  next()
}
app.use(myLogin)
```

### 路由

```js
app.get('/', (req, res) => {
  res.send(req.query || req.param)
})
```

### 异常处理
