/**
 * 二维向量
 */
export default class Vector {
  /**
   * @param {Vector} v0
   * @param {Vector} v1
   */
  static add(v0, v1) {
    return new Vector(v0.x + v1.x, v0.y + v1.y);
  }

  /**
   * @param {Vector} v0
   * @param {Vector} v1
   */
  static sub(v0, v1) {
    return new Vector(v0.x - v1.x, v0.y - v1.y);
  }

  /**
   * 点乘
   * @param {Vector} v0
   * @param {Vector} v1
   */
  static dot(v0, v1) {
    return v0.x * v1.x + v0.y * v1.y;
  }

  /**
   * 乘标量
   * @param {Vector} v
   * @param {Number} s
   */
  static mult(v, s) {
    return new Vector(v.x * s, v.y * s);
  }

  /**
   * 除标量
   * @param {Vector} v
   * @param {Number} s
   */
  static div(v, s) {
    return new Vector(v.x / s, v.y / s);
  }

  /**
   * @param {Vector} v0
   * @param {Vector} v1
   * @return {Number}
   */
  static dist(v0, v1) {
    return Math.sqrt((v0.x - v1.x) ** 2 + (v0.y - v1.y) ** 2);
  }

  /**
   * @param {Vector} v0
   * @param {Vector} v1
   * @return {Number}
   */
  static squaredDist(v0, v1) {
    return (v0.x - v1.x) ** 2 + (v0.y - v1.y) ** 2;
  }

  /**
   * @param {Vector} v0
   * @param {Vector} v1
   * @return {Number} 输入向量间的夹角
   */
  static angleBetween(v0, v1) {
    if (v0.x === 0 || v0.y === 0) {
      return 0;
    }
    if (v1.x === 0 || v1.y === 0) {
      return 0;
    }
    const dot = Vector.dot(v0, v1);
    const amt = dot / (v0.mag() * v1.mag());
    // 处理小数位处理超出范围的情况
    if (amt <= -1) {
      return Math.PI;
    }
    if (amt >= 1) {
      return 0;
    }
    return Math.acos(amt);
  }

  /**
   * 单位化向量
   * @param {Vector} v
   */
  static normalize(v = new Vector()) {
    const mag = v.mag();
    if (mag !== 0 && mag !== 1) {
      v.x /= mag;
      v.y /= mag;
    }
    return v;
  }

  /**
   * 通过极坐标方式生成向量
   * @param {Number} r
   * @param {Number} theta
   * @return {Vector}
   */
  static polar(r, theta) {
    return new Vector(r * Math.cos(theta), r * Math.sin(theta));
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * @param {Vector} v
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * @param {Vector} v
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * 点乘
   * @param {Vector} v
   */
  dot(v) {
    return Vector.dot(this, v);
  }

  /**
   * 乘标量
   * @param {Number} v
   */
  mult(v) {
    this.x *= v;
    this.y *= v;
    return this;
  }

  /**
   * 除标量
   * @param {Number} v
   */
  div(v) {
    this.x /= v;
    this.y /= v;
    return this;
  }

  /**
   * 单位化向量
   */
  normalize() {
    const mag = this.mag();
    if (mag !== 0 && mag !== 1) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  /**
   * @return {Number} 向量的方向(弧度)
   */
  heading() {
    const angle = Math.atan2(-this.y, this.x);
    return -angle;
  }

  /**
   * @param {Number} max 向量最大长度
   */
  limit(max) {
    const mag = this.mag();
    if (mag > max) {
      this.x *= max / mag;
      this.y *= max / mag;
    }
    return this;
  }

  /**
   * @return {Number} 向量长度
   */
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * @param {Number} mag
   */
  setMag(mag) {
    const m = this.mag();
    if (m !== 0) {
      this.x *= mag / m;
      this.y *= mag / m;
    }
    return this;
  }

  /**
   * @param {Vector} v
   * @return {Number}
   */
  dist(v) {
    return Vector.dist(this, v);
  }

  /**
   * @param {Vector} v
   * @return {Number}
   */
  squaredDist(v) {
    return Vector.squaredDist(this, v);
  }

  /**
   * @param {Vector} v
   * @return {Number} 输入向量间的夹角
   */
  angleBetween(v) {
    return Vector.angleBetween(this, v);
  }

  clone() {
    return new Vector(this.x, this.y);
  }
};
