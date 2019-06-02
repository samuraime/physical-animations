import React, { useState, useRef, useEffect } from 'react';
import Animation from './Animation';
import s from './Lottery.module.css';

const animate = async (ele, dx, dy) => {
  const animation = new Animation(ele);
  await animation.scale(1, 1.1);
  await animation.scale(1.1, 1);
  await animation.scale(1, 1.08);
  await animation.scale(1.08, 1);
  await animation.cast(dx, dy);
};

export default function Lottery() {
  const containerRef = useRef(null);
  const [list, setList] = useState([]);
  const handleClick = () => {
    setList([
      ...list,
      {
        id: Math.random().toString(36).toUpperCase(),
        animation: true,
      },
    ]);
  };

  useEffect(() => {
    const lottery = list.find(({ animation }) => animation);

    if (!lottery) {
      return;
    }

    const scrollTop = document.body.scrollTop;
    const viewHeight = window.innerHeight;
    const viewWidth = containerRef.current.clientWidth;
    const number = this[`lucyNumber${lottery.id}`];
    const plainNumber = this[`plainNumber${lottery.id}`];
    const { top: rootTop } = this.root.getBoundingClientRect();
    const { width, height, left, top } = plainNumber.getBoundingClientRect();
    const dy = top + height / 2 - viewHeight / 2;
    const dx = left + width / 2 - viewWidth / 2;

    number.style.top = `${scrollTop + viewHeight / 2 - (rootTop + scrollTop)}px`;
    animate(number, dx, dy).then(() => {
      // TODO list is new list?
      setList();
    });
  });

  return (
    <div className={s.root} ref={containerRef}>
      <div className={s.placeholder} />
      {list.filter(({ animation }) => animation).map(item => (
        <div
          // ref={(node) => { this[`lucyNumber${item.luckyNumber}`] = node; }}
          className={s.luckyNumber}
        >
          {item.id}
        </div>
      ))}
      <button className={s.lottery} onClick={handleClick}>抽奖</button>
      <div className={s.placeholder} />
      <div className={s.placeholder} />
      <div className={s.records}>
        {list.map(item => (
          <span
            key={item.id}
            ref={(node) => { this[`plainNumber${item.id}`] = node; }}
            className={s.number}
          >
            {item.id}
          </span>
        ))}
      </div>
    </div>
  );
}
