import withCanvas from '../../components/withCanvas';
import Vector from '../../utils/Vector';
import noise from '../../utils/perlin';
import { noiseMap } from '../../utils';

function NoiseFlowField({ context: ctx, width, height }) {
   noise.seed(Math.random());

  class FlowField {
    constructor(width, height, size) {
      this.size = size;
      this.rows = Math.ceil(height / size);
      this.cols = Math.ceil(width / size);
      this.run = this.run.bind(this);
      this.fields = [];
      this.time = 0;
      this.period = 1 / 800;
      this.timePeriod = 1 / 2;
      this.update();
    }
    update() {
      this.time += 0.01;
      for (let i = 0; i < this.rows; i++) {
        this.fields[i] = [];
        for (let j = 0; j < this.cols; j++) {
          // 只计算分块中心点的噪声作为可视化展示
          const n = noise.simplex2(
            (this.size * j + this.size / 2) * this.period,
            (this.size * i + this.size / 2) * this.period
          );
          this.fields[i][j] = noiseMap(n, 0, 2 * Math.PI);
        }
      }
    }
    // 查找location位置的所需速度
    lookup(location) {
      const n = noise.simplex2(location.x * this.period, location.y * this.period);
      return noiseMap(n, 0, 2 * Math.PI);
    }
    display() {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          ctx.save();
          ctx.fillStyle = '#eee';
          ctx.translate(j * this.size + this.size / 2, i * this.size + this.size / 2);
          ctx.rotate(this.fields[i][j]);
          ctx.beginPath();
          ctx.moveTo(this.size / 2 - this.size / 8, 0);
          ctx.lineTo(-this.size / 2 + this.size / 8, this.size / 8);
          ctx.lineTo(0, 0);
          ctx.lineTo(-this.size / 2 + this.size / 8, -this.size / 8);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    }
    run() {
      this.update();
      this.display();
      requestAnimationFrame(this.run);
    }
  }

  class Vehicle {
    constructor(location = new Vector(), velocity = new Vector(), acceleration = new Vector()) {
      this.location = location;
      this.velocity = velocity;
      this.acceleration = acceleration;
      this.maxSpeed = 10;
      this.maxForce = 2;
      this.flowField = new FlowField(width, height, 80);
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
    follow() {
      const flowMaxSpeed = 10;
      const theta = this.flowField.lookup(this.location);
      const desired = new Vector(Math.cos(theta), Math.sin(theta)).mult(flowMaxSpeed);
      const steer = Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
    display(ctx) {
      ctx.clearRect(0, 0, width, height);
      this.flowField.display();
      ctx.save();
      ctx.beginPath();
      const theta = this.velocity.heading();
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
}

export default withCanvas(NoiseFlowField);
