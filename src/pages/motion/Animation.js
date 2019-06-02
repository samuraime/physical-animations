const { abs, sign, sqrt } = Math;

export default class Animation {
  /**
   * @param {Element} node
   */
  constructor(node) {
    this.node = node;
  }

  /**
   * @param {Number} start 初始放大因子
   * @param {Number} end 终止放大因子
   * @return {Promise}
   */
  scale(start, end) {
    return new Promise((resolve) => {
      const ds = end - start;
      const scaleSign = sign(ds);
      const vs = 0.008 * scaleSign;
      let s = start;

      const update = () => {
        if (abs(s - start) > abs(ds)) {
          resolve();
          return;
        }

        s += vs;
        this.node.style.transform = `scale3d(${s}, ${s}, 1)`;
        requestAnimationFrame(update);
      };
      update();
    });
  }

  /**
   * 给定dx, dy, 计算抛物线轨迹动画
   * 动画总时间不定, 根据a, 不是t
   * @param {Number} dx deltaX
   * @param {Number} dy deltaY
   * @param {Number} t 动画执行时间
   * @return {Promise}
   */
  cast(dx, dy) {
    return new Promise((resolve) => {
      // dy = 1 / 2 * a * t ^ 2
      const ay = 0.8 * sign(dy); // 加速度因子
      const t = sqrt(2 * dy / ay);
      const vx = dx / t;
      let x = 0;
      let y = 0;
      let vy = 0;
      const update = () => {
        if (abs(x) > abs(dx) || abs(y) > abs(dy)) {
          resolve();
          return;
        }

        x += vx;
        vy += ay;
        y += vy;
        const ratio = 1 - abs(y / dy);
        this.node.style.transform = `translate3d(${x}px, ${y}px, 0) scale3d(${ratio}, ${ratio}, 1)`;
        this.node.style.opacity = ratio + 0.1; // 加个值，不让透明度消失太快
        requestAnimationFrame(update);
      };
      update();
    });
  }
}
