import React from 'react';
import withCanvas from '../../components/withCanvas';
import { random } from '../../utils';
import s from './Distribution.module.css';

function getComponent(getPoint) {
  function Distribution({ context: ctx, width, height }) {
    const count = 300;
    const radius = 4;

    Array.from({ length: count }).forEach(() => {
      const { x, y } = getPoint(width, height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    });
  }

  return withCanvas(Distribution);
}

const Rect1 = getComponent((width, height) => {
  const x = random(0, width);
  const y = random(0, height);
  return { x, y };
});

// TODO: 换个简单原理的, 要么去掉
// const Rect2 = getComponent((width, height) => {
//   const getRandom = (axis) => {
//     const half = axis / 2;
//     const rand = random(-1, 1);
//     const radius = Math.sin((rand ** 2) * Math.PI / 2) * Math.sign(rand);

//     return radius * half + half;
//   };

//   const x = getRandom(width);
//   const y = getRandom(height);
//   return { x, y };
// });

const Circle1 = getComponent((width, height) => {
  const radius = Math.sqrt(Math.random()) * width / 2;
  const theta = random(0, 2 * Math.PI);
  const x = radius * Math.cos(theta) + width / 2;
  const y = radius * Math.sin(theta) + height / 2;
  return { x, y };
});

const Circle2 = getComponent((width, height) => {
  const radius = random(0, width / 2);
  const theta = random(0, 2 * Math.PI);

  const x = radius * Math.cos(theta) + width / 2;
  const y = radius * Math.sin(theta) + height / 2;

  return { x, y };
});

function Distribution() {
  return (
    <div className={s.root}>
      <div className={s.row}>
        <Rect1 className={s.item} />
        <Circle1 className={s.item} />
        <Circle2 className={s.item} />
      </div>
    </div>
  );
}

export default Distribution;
