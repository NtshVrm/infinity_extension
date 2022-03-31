import "./home.css";

export default function Home() {
  return (
    <div className="home-container banner">
      <div className="content">
        <p className="intro-text">Hey there! What's your name?</p>
        <input type="text" className="intro-input" />
      </div>
    </div>
  );
}
