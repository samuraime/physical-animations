import Vector from 'vector-es';
import withCanvas from '../../components/withCanvas';

class Ball extends Vector {
  constructor({ context, x, y, m, v, radius }) {
    super(x, y);
    this.context = context;
    this.m = m;
    this.v = v;
    this.radius = radius;
  }

  collideTo(node) {
    // v0final = ((m0 - m1) * v0 + 2 * m1 * v1) / (m0 + m1);
    // v1final = ((m1 - m0) * v1 + 2 * m0 * v0) / (m0 + m1);
    const nodeV = Vector
      .add(Vector.mult(node.v, node.m - this.m), Vector.mult(this.v, 2 * this.m))
      .div(node.m + this.m);
    this.v = Vector
      .add(Vector.mult(this.v, this.m - node.m), Vector.mult(node.v, 2 * node.m))
      .div(node.m + this.m);
    node.v = nodeV;
  }

  update() {
    this.add(this.v);
  }

  render() {
    const { context: ctx, x, y, radius } = this;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

function Collision({ context: ctx, width, height }) {
  const theSmall = new Ball({
    context: ctx,
    x: 0,
    y: height / 2,
    v: new Vector(20, 0),
    m: 20,
    radius: 20,
  });
  const theBig = new Ball({
    context: ctx,
    x: width / 2,
    y: height / 2,
    v: new Vector(0, 0),
    m: 50,
    radius: 50,
  });
  const balls = [theBig, theSmall];

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    balls.forEach((ball) => {
      ball.render();
    });
  };

  const update = () => {
    // 碰撞检测
    if (theBig.dist(theSmall) < (theBig.radius + theSmall.radius)) {
      theBig.collideTo(theSmall);
    }
    balls.forEach((ball) => {
      ball.update();
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    update();
  };

  animate();
}

export default withCanvas(Collision);
