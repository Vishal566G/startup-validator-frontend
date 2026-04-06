import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { submitIdea } from "../api";

function SubmitIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return setError("Both fields are required");

    try {
      setLoading(true);
      setError("");
      const res = await submitIdea({ title, description });
      navigate(`/ideas/${res.data._id}`);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
      <h1>Validate Your Startup Idea</h1>
      <p>Get an AI-powered analysis in seconds.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          placeholder="Idea title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <textarea
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          {loading ? "Analyzing..." : "Validate Idea"}
        </button>
      </div>

      <p style={{ marginTop: "20px" }}>
        <Link to="/dashboard" style={{ textDecoration: "none", color: "blue" }}>
          View all ideas →
        </Link>
      </p>
    </div>
  );
}

export default SubmitIdea;
