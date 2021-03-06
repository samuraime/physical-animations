import Vector from 'vector-es';
import withCanvas from '../../components/withCanvas';
import { random } from '../../utils';

class Node extends Vector {
  constructor(garden) {
    super();
    this.garden = garden;
    this.reset();
  }

  reset() {
    this.x = random(0, this.garden.width);
    this.y = random(0, this.garden.height);
    this.v = new Vector(random(-0.25, 0.25), random(-0.25, 0.25));
    this.m = random(0.5, 3);
  }

  addForce (force, direction) {
    const a = direction.mult(force / this.m);
    this.v.add(a);
  }

  collideTo(node) {
    const { v, m } = node;
    v.x = m * v.x / (this.m + m) + this.m * this.v.x / (this.m + m);
    v.y = m * v.y / (this.m + m) + this.m * this.v.y / (this.m + m);

    this.reset();
  }

  getDiameter() {
    return this.m;
  }

  update() {
    this.add(this.v.mult(1));
    // this.x += this.vx * deltaTime / targetFPS;

    const { x, y, garden: { width, height } } = this;

    if (x > width + 50 || x < -50 || y > height + 50 || y < -50) {
      // if node over screen limits - reset to a init position
      this.reset();
    }
  }

  render() {
    const { x, y, garden: { ctx } } = this;
    ctx.beginPath();
    ctx.arc(x, y, this.getDiameter(), 0, 2 * Math.PI);
    ctx.fill();
  }
}

function NodeGarden({ context: ctx, width, height }) {
  const nodes = Array.from({ length: 100 }, () => (
    new Node({
      ctx,
      width,
      height,
    })
  ));

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000';

    // update links
    for (let i = 0; i < nodes.length - 1; i++) {
      const nodeA = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const distanceSquared = nodeA.distSq(nodeB);

        // calculate gravity force
        const force = 3 * (nodeA.m * nodeB.m) / distanceSquared;
        const opacity = force * 100;

        if (opacity < 0.025) {
          continue;
        }

        // 碰撞检测
        if (distanceSquared <= (nodeA.m / 2 + nodeB.m / 2) * (nodeA.m / 2 + nodeB.m / 2)) {
          // collision: remove smaller or equal - never both of them
          if (nodeA.m <= nodeB.m) {
            nodeA.collideTo(nodeB);
          } else {
            nodeB.collideTo(nodeA);
          }
          continue;
        }

        // calculate gravity direction
        const direction = Vector.sub(nodeB, nodeA);
        nodeA.addForce(force, direction);
        nodeB.addForce(-force, direction);

        // draw gravity lines
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(63,63,63,' + (opacity < 1 ? opacity : 1) + ')';
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      }
    }

    nodes.forEach((node) => {
      node.render();
      node.update();
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  animate();
}

export default withCanvas(NodeGarden);
