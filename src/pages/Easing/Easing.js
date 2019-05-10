import React, { memo } from 'react';
import s from './Easing.module.css';

// window.scrollTo({ top: 0, behavior: 'smooth' });
function easing(source, target) {
  const delta = target - source;
  const next = source + delta * 0.05;
  if (Math.abs(next - target) < 1) {
    return;
  }

  requestAnimationFrame(() => {
    window.scrollTo(0, next);
    easing(next, target);
  });
}

function Easing() {
  const handleUp = () => {
    easing(window.scrollY, 0);
  };

  const handleDown = () => {
    const target = document.body.clientHeight - window.innerHeight;
    easing(window.scrollY, target);
  };

  return (
    <div>
      {Array.from({ length: 100 }, (_, index) => (
        <div key={index} className={s.item}>
          {index}
        </div>
      ))}
      <div className={s.buttons}>
        <button className={s.button} onClick={handleUp}>Up</button>
        <button className={s.button} onClick={handleDown}>Down</button>
      </div>
    </div>
  );
}

export default memo(Easing);
