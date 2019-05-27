# Physical Animations

我要准备一个物理动画入门Session.  [SLIDES.md](./SLIDES.md)

目标: 能徒手写简单二维动画

This project was bootstrapped with [Create React App](./CREATE_REACT_APP.md)

## 预备知识

  - 速度v(velocity), 加速度a(acceleration), 力f(force)等
  - 向量(vector)

## 一些可能需要解释的点
  
  - 帧动画
  - 画布坐标系, 单位(标准单位->绘制单位)
  - 时间维度和空间维度的动画
  - 比较CSS Animation
  - 比较Bezier
  - 噪声

## Content

### 缓动与弹动 Easing and Springing

  比例运动  
    - 设置目标点  
    - 确定物体与目标点的位置  
    - 运动和距离成正比 - 距离越远, 运动程度越大

  - 缓动
    
    滚动条平滑移动```window.scrollTo({ top, behavior: 'smooth' });```

  - 弹动

    造个弹簧吧

### 跟随

  - 鼠标跟随效果, 小尾巴
  - 波形文字

### 二维运动

  平抛运动

  - 商品跳进购物车
  - Super Mario
  - 抽奖

### 碰撞 and 动量守恒
  
  - 匀速弹球
  - 桌球碰撞

### 引力 Gravitation
  
  - 捕获天体

### 随机游走 Random (with Vector)
  
  - 噪声

    噪声随机游走

  - 布朗运动

    布朗运动

### 随机分布 Random Distribution

  - 方形分布

  - 圆形分布

    实例: 压筹码

### 粒子 Particles
  
  - Node Garden

## Tips and Tricks

  - squaredDistance
  - 步长的选择

## Reference

  - [The Nature of Code](https://natureofcode.com/) [代码本色](https://item.jd.com/11587473.html)
  - [Foundation HTML5 Animation with JavaScript](https://lamberta.github.io/html5-animation/) [HTML5+JavaScript动画基础](https://item.jd.com/11253207.html)
  - [Node Garden](https://github.com/pakastin/nodegarden)

## License

[MIT](./LICENSE)
