export default function UserProfile({ image, nickname }) {
  return (
    <div className="miniBoardWriter">
      <img
        alt="profile"
        src={image}
        style={{ width: "30px", height: "30px" }}
        className="miniWriterImage"
      />
      <p className="miniWriterName">{nickname}</p>
    </div>
  );
}
