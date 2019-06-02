import React, { createRef, useState, useRef, useEffect } from 'react';
import update from 'immutability-helper';
import Animation from './Animation';
import s from './Lottery.module.css';

function Placeholder() {
  return (
    <div className={s.placeholder} />
  );
}

const animate = async (ele, dx, dy) => {
  const animation = new Animation(ele);
  await animation.scale(1, 1.1);
  await animation.scale(1.1, 1);
  await animation.scale(1, 1.08);
  await animation.scale(1.08, 1);
  await animation.cast(dx, dy);
};

const getLotteryItem = () => ({
  id: Math.random().toString(36).toUpperCase().slice(2, 10),
  animation: false,
  ref: createRef(),
});

const initList = Array.from({ length: 10 }, getLotteryItem);

export default function Lottery() {
  const rootRef = useRef(null);
  const luckyNumberRef = useRef(null);
  const [list, setList] = useState(initList);
  const [isAnimating, setAnimationStatus] = useState(false);

  const handleClick = () => {
    if (isAnimating) {
      return;
    }

    setList([
      ...list,
      {
        ...getLotteryItem(),
        animation: true,
      },
    ]);
  };

  useEffect(() => {
    const lottery = list.find(({ animation }) => animation);

    if (!lottery || isAnimating) {
      return;
    }

    const root = rootRef.current;
    const luckyNumber = luckyNumberRef.current;
    const plainNumber = lottery.ref.current;
    const viewHeight = window.innerHeight;
    const { clientWidth: viewWidth } = document.body;
    const { top: rootTop } = root.getBoundingClientRect();
    const { width, height, left, top } = plainNumber.getBoundingClientRect();
    const dy = top + height / 2 - viewHeight / 2;
    const dx = left + width / 2 - viewWidth / 2;

    luckyNumber.style.top = `${viewHeight / 2 - rootTop}px`;
    luckyNumber.style.visibility = 'visible';
    setAnimationStatus(true);
    animate(luckyNumber, dx, dy).then(() => {
      const index = list.findIndex(({ animation }) => animation);
      setList(update(list, {
        [index]: {
          animation: {
            $set: false,
          },
        },
      }));
      setAnimationStatus(false);
    });
  }, [list, isAnimating]);

  const luckyNumber = list.find(({ animation }) => animation) || null;

  return (
    <div className={s.root} ref={rootRef}>
      <Placeholder />
      <Placeholder />
      {luckyNumber && (
        <div ref={luckyNumberRef} className={s.luckyNumber}>
          {luckyNumber.id}
        </div>
      )}
      <button className={s.lottery} onClick={handleClick}>抽奖</button>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <div className={s.records}>
        {list.map((item, i) => (
          <span
            key={item.id}
            ref={list[i].ref}
            className={s.number}
          >
            {item.id}
          </span>
        ))}
      </div>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </div>
  );
}
