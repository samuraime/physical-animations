import React from 'react';
import Vector from 'vector-es';
import withCanvas from '../../components/withCanvas';
import noise from '../../utils/perlin';
import { noiseMap } from '../../utils';
import s from './NoiseFlowField.module.css';

noise.seed(Math.random());
const NOISE_PERIOD = 1 / 800;

const FlowFieldCanvas = withCanvas(({ context: ctx, width, height }) => {
  const size = 80;
  const rows = Math.ceil(height / size);
  const cols = Math.ceil(width / size);
  const getFieldMatrix = () => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        // 只计算分块中心点的噪声作为可视化展示
        const n = noise.simplex2(
          (size * j + size / 2) * NOISE_PERIOD,
          (size * i + size / 2) * NOISE_PERIOD
        );
        matrix[i][j] = noiseMap(n, 0, 2 * Math.PI);
      }
    }
    return matrix;
  }

  const render = () => {
    const matrix = getFieldMatrix();
    ctx.fillStyle = '#eee';
    ctx.beginPath();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        ctx.save();
        ctx.translate(j * size + size / 2, i * size + size / 2);
        ctx.rotate(matrix[i][j]);
        ctx.beginPath();
        ctx.moveTo(size / 2 - size / 8, 0);
        ctx.lineTo(-size / 2 + size / 8, size / 8);
        ctx.lineTo(0, 0);
        ctx.lineTo(-size / 2 + size / 8, -size / 8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.fill();
  };

  render();
});

const VehicleCanvas = withCanvas(({ context: ctx, width, height }) => {
  class Vehicle {
    constructor(location = new Vector(), velocity = new Vector(), acceleration = new Vector()) {
      this.location = location;
      this.velocity = velocity;
      this.acceleration = acceleration;
      this.maxSpeed = 10;
      this.maxForce = 2;
      this.run = this.run.bind(this);
    }
    applyForce(force) {
      this.acceleration.add(force);
    }
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.location.add(this.velocity);
      // reset加速度
      this.acceleration.mult(0);
      // if (this.location.x < 0 || this.location.x > width || this.location.y < 0 || this.location.y > height) {
      //   this.location.set(width / 2, height / 2);
      // }
      if (this.location.x < 0) {
        this.location.x = width;
      } else if (this.location.x > width) {
        this.location.x = 0;
      }
      if (this.location.y < 0) {
        this.location.y = height;
      } else if (this.location.y > height) {
        this.location.y = 0;
      }
    }
    // 查找location位置的所需速度
    getFieldVelocityDirection() {
      const n = noise.simplex2(this.location.x * NOISE_PERIOD, this.location.y * NOISE_PERIOD);
      return noiseMap(n, 0, 2 * Math.PI);
    }
    follow() {
      const flowMaxSpeed = 10;
      const theta = this.getFieldVelocityDirection();
      const desired = new Vector(Math.cos(theta), Math.sin(theta)).mult(flowMaxSpeed);
      const steer = Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
    display(ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.beginPath();
      const theta = this.velocity.dir();
      ctx.translate(this.location.x, this.location.y);
      ctx.rotate(theta + Math.PI / 2);
      ctx.moveTo(0, 0);
      ctx.lineTo(-10, 40);
      ctx.lineTo(0, 20);
      ctx.lineTo(10, 40);
      ctx.closePath();
      ctx.restore();
      ctx.fill();
    }
    run() {
      this.follow();
      this.update();
      this.display(ctx);
      requestAnimationFrame(this.run);
    }
  }

  const location = new Vector(width / 2, height / 2);
  const vehicle = new Vehicle(location);
  vehicle.run();
});

// Separate background and foreground for performance
// FlowFieldCanvas and VehicleCanvas share same noise period(NOISE_PERIOD)
function NoiseFlowField() {
  return (
    <div className={s.root}>
      <FlowFieldCanvas className={s.background} />
      <VehicleCanvas className={s.foreground} />
    </div>
  );
}

export default NoiseFlowField;
