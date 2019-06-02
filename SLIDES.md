# Physical Animation Slides

## Physical Animation

  - Natural

    - Bezier 硬编码 难以控制物理模型
    - Noise

  - Phisical Law

## Frame Animation

  - 静态帧 Static Frame
  - 模糊帧 Dynamic Frame

## Comparison

### CSS Animation

  优点很多: 实现简单, GPU加速

  - 只能应用DOM
  - 硬编码的duration
  - 硬编码的时间函数, 而且种类少
  - 控制不够灵活
  - 不规则曲线

## 开动前的准备

  - 速度v(velocity), 加速度a(acceleration), 力f(force), 质量m(mass), 时间t(time)
    ```
    a = f / m;
    v = a * t;
    s = v * t;
    ````
  - 向量(vector)
    ```
    { x, y }
    ```
  - 坐标系
    左上角为(0, 0)
  - 单位
    m / s -> pixel / frame

## 三板斧

  - render (绘制)
  - update (更新位置)
  - nextFrame (下一帧)

## 开胃菜 - 匀加速运动

  - Principle
    ```
    function update() {
      velocity += acceleration;
      location += velocity;
    }
    ```
  - Code
  - Demo

## 缓动 Easing

  比例运动  
    - 设置目标点  
    - 确定物体与目标点的位置  
    - 运动和距离成正比 - 距离越远, 运动程度越大

  - Principle
    ```
    function easeIn() {
      delta = target - current;
      velocity = k * delta;
      location += velocity;
    }
    ```
  - Code
  - Demo `window.scrollTo({ top, behavior: 'smooth' });`

## 弹动 Spring

  - Principle
    ```
    function spring() {
      delta = target - current;
      acceleration = k * delta;
      velocity += acceleration;
      location += velocity;
    }
    ```
  - Code
  - Demo 弹簧

## 简单缓动跟随 Following (TODO 咔掉)

  - Principle 
  - Code
  - Demo

## 二维运动(重点看平抛运动)

  - Principle
    ```
    function update() {
      velocity.add(acceleration);
      location.add(velocity);
    }
    ```
  - Code
  - Demo
  - Demo 购物车
  - Demo 抽奖

## 碰撞 Collision
  - 碰撞检测
  - 动量守恒
  - Principle
    ```
    v0final = ((m0 - m1) * v0 + 2 * m1 * v1) / (m0 + m1);
    v1final = ((m1 - m0) * v1 + 2 * m0 * v0) / (m0 + m1);
    ```
  - Code
  - Demo

## 引力 Gravity

  - Principle
    ```
    F = G * m1 * m2 / r ** 2;
    ```
  - Code
  - Demo

## 随机分布 Random Distribution

### 方形分布

  - Principle
    ```
    x = random(0, width);
    y = random(0, height);
    ```
  - Code
  - Demo

### 圆形分布
  
  - Principle
    ```
    x = randomRadius * cos(randomAngle);
    y = randomRadius * sin(randomAngle);
    ```
  - Code
  - Demo

## 随机游走 Random Walk

  - Principle
    ```
    velocity += random();
    ```
  - Code
  - Demo

## 最后的硬菜 Particles

  - 粒子
  - Code
  - Demo Node Garden

## The End

  理解原理, 必要时简单实现, 让Web更有表现力

  - 添加更多物理模型 / 简化模型
  - Tips and Tricks
  - Optimization for production

## Reference

  - [The Nature of Code](https://natureofcode.com/) [代码本色](https://item.jd.com/11587473.html)
  - [Foundation HTML5 Animation with JavaScript](https://lamberta.github.io/html5-animation/) [HTML5+JavaScript动画基础](https://item.jd.com/11253207.html)
  - [Node Garden](https://github.com/pakastin/nodegarden)
  - [为什么电影24帧就算流畅，主机30帧就算流畅，而电脑游戏需要60帧流畅？](https://zhuanlan.zhihu.com/p/48674410)
  - [是不是游戏帧数一般要到 60 帧每秒才流畅，而过去的大部分电影帧数只有 24 帧每秒却没有不流畅感？](https://www.zhihu.com/question/21081976/answer/34748080)

## Thanks & Q & A
