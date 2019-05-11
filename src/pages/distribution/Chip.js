import React from 'react';
import s from './Chip.module.css';

export default function Chip({ type, className, ...props }) {
  const chipType = `chip${type}`;
  const finalClassName = [s.chip, s[chipType],  className].join(' ');
  return (
    <div className={finalClassName} {...props} />
  );
}
