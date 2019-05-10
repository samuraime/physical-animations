import React, { memo, useRef } from 'react';
import s from './Easing.module.css';

// window.scrollTo({ top: 0, behavior: 'smooth' });
function easing(source, target) {
  const delta = target - source;
  const next = source + delta * 0.01;
  if (Math.abs(next - target) < 1) {
    return;
  }

  requestAnimationFrame(() => {
    window.scrollTo(0, next);
    easing(next, target);
  });
}

function Easing(props) {
  const domRef = useRef(null);

  const handleUp = () => {
    const { scrollTop } = domRef.current;
    easing(scrollTop, 0);
  };

  const handleDown = () => {
    const { scrollHeight, clientHeight } = domRef.current;

    easing(clientHeight - scrollHeight, clientHeight);
  };

  return (
    <div ref={domRef} {...props}>
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
