import React, { useState, useEffect } from 'react';
import { random } from '../../utils';
import Vector from '../../utils/Vector';
import Chip from './Chip';
import s from './BetTable.module.css';

function getRandomPoint(maxRadius) {
  const radius = Math.random() ** 2 * maxRadius;
  const theta = random(0, 2 * Math.PI);
  const point = Vector.polar(radius, theta);
  const x = point.x + maxRadius;
  const y = point.y + maxRadius;

  return { x, y };
};

function BetTable() {
  const [chips, setChips] = useState([]);

  const tableSize = 300;

  useEffect(() => {
    if (chips.length > 200) {
      return;
    }
    requestAnimationFrame(() => {
      const { x, y } = getRandomPoint(tableSize / 2);
      setChips([...chips, {
        x,
        y,
        type: Math.ceil(random(0, 5)),
      }]);
    });
  });

  return (
    <div className={s.page}>
      <div
        className={s.table}
        style={{ width: tableSize, height: tableSize }}
      >
        {chips.map(({ x, y, type }, i) => (
          <Chip
            key={i}
            type={type}
            className={s.chip}
            style={{ left: x, top: y }}
          />
        ))}
      </div>
    </div>
  );
}

export default BetTable;
