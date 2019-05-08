import withCanvas from '../../components/withCanvas';

function VectorDemo({ context, width, height }) {
  console.log(context, width, height);
}

export default withCanvas(VectorDemo);
