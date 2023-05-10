interface Props {
  type: string;
  size: string;
  variant: string;
}

const AnimatedButton = ({ type, size, variant }: Props): JSX.Element => (
  <button>
    <span></span>
    <span></span>
  </button>
);

export default AnimatedButton;
