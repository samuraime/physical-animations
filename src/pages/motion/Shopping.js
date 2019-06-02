import React, { memo, useRef } from 'react';
import Vector from '../../utils/Vector';
import s from './Shopping.module.css';

function Placeholder() {
  return (
    <div className={s.placeholder} />
  );
}

/**
 * @param {HTMLElement} element
 * @param {Vector} source
 * @param {Vector} target
 */
function jumpToCart(element, source, target) {
  // given: source location, target location, vx -> time
  // in the y direction: delta.y = v.y * t + 1 / 2 * a.y * t ^ 2
  // a.y should be positive, v.y should be negative.
  const delta = Vector.sub(target, source);
  const t = 60; // frames
  const a = new Vector(0, .6);
  const v = new Vector(delta.x / t, (delta.y - 1 / 2 * a.y * t ** 2) / t);
  const p = source.clone();

  const setPosition = (position) => {
    element.style.display = 'block';
    element.style.transform = `translate(${position.x}px, ${position.y}px)`;
  };

  const update = () => {
    // 先加a
    // 每帧平均速度: v+=a v+=2a v+=3a
    // p+=v+a p+=2v+3a p+=3v+6a

    // actual: s=vt+1/2at^2
    // 每帧平均速度: v+=0.5a v+=1.5a v+=2.5a
    // p+=v+0.5a p+=2v+2a p+=3v+4.5a

    // 后加a
    // 每帧平均速度: v+=0 v+=a v+=2a
    // p+=v p+=2v+a p+=3v+3a

    v.add(a);
    const halfA = Vector.div(a, 2);
    p.add(Vector.sub(v, halfA));

    // p.add(v);
    // v.add(a);
  }

  const animate = () => {
    // if (p.x > target.x && p.y > target.y) {
    //   return;
    // }
    if (p.x > target.x + 1) {
      return;
    }

    requestAnimationFrame(animate);

    setPosition(p);

    update();
  };

  animate();
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
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <button
          ref={buyRef}
          className={s.buy}
          onClick={handleClick}
        >
          加入购物车
        </button>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
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
