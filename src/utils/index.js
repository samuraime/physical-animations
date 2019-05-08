import Vector from './Vector.js';

/**
 * 将区间的值映射到目标区间
 */
export const map = (value, start, end, targetStart, targetEnd) => {
  if (value < start || value > end) {
    throw new RangeError();
  }
  return (value - start) / (end - start) * (targetEnd - targetStart) + targetStart;
};

/**
 * -1 ~ 1的噪声映射
 */
export const noiseMap = (value, start, end) => {
    return map(value, -1, 1, start, end);
};

export const random = (min, max) => {
  return map(Math.random(), 0, 1, min, max);
};

/**
 * 弧度转换角度
 */
export const toDegree = radians => radians * 180 / Math.PI;

/**
 * 角度转换弧度
 */
export const toRadian = degrees => degrees * Math.PI / 180;

/**
 * 获取点线最近交点(法线)
 * @param {Vector} location 点
 * @param {Vector} start 线起点
 * @param {Vector} end 线终点
 */
export const getNormalPoint = (location, start, end) => {
  const a = Vector.sub(location, start);
  const b = Vector.sub(end, start);
  const theta = Vector.angleBetween(b, a);
  return Vector.add(start, b.setMag(a.mag() * Math.cos(theta)));
};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {Vector}
 */
export const captureMouse = (element) => {
  const mouse = new Vector(0, 0);
  const body_scrollLeft = document.body.scrollLeft;
  const element_scrollLeft = document.documentElement.scrollLeft;
  const body_scrollTop = document.body.scrollTop;
  const element_scrollTop = document.documentElement.scrollTop;
  const offsetLeft = element.offsetLeft;
  const offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', (event) => {
    let x, y;

    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);
  
  return mouse;
};

export default {
  map,
  noiseMap,
  random,
  toDegree,
  toRadian,
  getNormalPoint,
  captureMouse,
};
