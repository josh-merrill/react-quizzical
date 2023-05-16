export default function Loader(props) {
  const { isLoading } = props;

  return (
    <div className="loading--container">
      <div className="loading--spinner"></div>
      <h2 className="loading--title">Loading...</h2>
    </div>
  );
}
