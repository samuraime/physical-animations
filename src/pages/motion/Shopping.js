import React, { memo, useRef } from 'react';
import Vector from '../../utils/Vector';
import s from './Shopping.module.css';

/**
 * @param {HTMLElement} element
 * @param {Vector} source
 * @param {Vector} target
 */
function jumpToCart(element, source, target) {
  // 做一个商品进购物车的抛物线
  // given: sourceLocation, targetLocation, vx -> time
  // in the y direction, deltaY = vy * t + 1 / 2 * ay * t ^ 2
  // if given a, we can get v0.
  // a should be positive, v0 should be negative.
  const delta = Vector.sub(target, source);
  const t = 40;
  const a = new Vector(0, 1.5);
  const v = new Vector(delta.x / t, (delta.y - 1 / 2 * a.y * t ** 2) / t);
  const p = source.copy();

  const updatePosition = (position) => {
    element.style.display = 'block';
    element.style.transform = `translate(${position.x}px, ${position.y}px)`;
  };

  const update = () => {
    requestAnimationFrame(() => {
      if (p.x > target.x && p.y > target.y) {
        return;
      }

      updatePosition(p);

      // calc new position
      v.add(a);
      p.add(v);

      update();
    });
  };

  update();
}

function getElementPosition(element) {
  const { left, top, width, height } = element.getBoundingClientRect();

  return new Vector(left + width / 2, top + height / 2);
}

function Shopping() {
  const cartRef = useRef(null);
  const buyRef = useRef(null);
  const itemRef = useRef(null);

  const handleClick = () => {
    const source = getElementPosition(buyRef.current);
    const target = getElementPosition(cartRef.current);
    jumpToCart(itemRef.current, source, target);
  };

  return (
    <div className={s.root}>
      <div>
        <div ref={itemRef} className={s.item} /> 
        <div className={s.placeholder} />
        <div className={s.placeholder} />
        <div className={s.placeholder} />
        <div className={s.placeholder} />
        <button
          ref={buyRef}
          className={s.buy}
          onClick={handleClick}
        >
          加入购物车
        </button>
        <div className={s.placeholder} />
        <div className={s.placeholder} />
        <div className={s.placeholder} />
        <div className={s.placeholder} />
        <div className={s.placeholder} />
      </div>
      <div className={s.sidebar}>
        <div ref={cartRef} className={s.shoppingCart}>
          <div className={s.cart}>购物车</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Shopping);
