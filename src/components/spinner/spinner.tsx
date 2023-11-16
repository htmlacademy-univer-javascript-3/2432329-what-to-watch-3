import './spinner.css';

type SpinnerProps = {
  isActive: boolean;
};

export default function Spinner({ isActive }: SpinnerProps) {
  if (!isActive) {
    return null;
  }
  return (
    <div className="spinner__container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
