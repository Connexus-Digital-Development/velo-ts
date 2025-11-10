interface SpinnerProps {
  colour?: string;
}

const Spinner = ({ colour = "velo-green" }: SpinnerProps) => (
  <div
    className="spinner-border text-dark"
    role="status"
    style={{ borderRightColor: `var(--${colour})` }}
  >
    <span className="visually-hidden">Loading...</span>
  </div>
);

export default Spinner;
