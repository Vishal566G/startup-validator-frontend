import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getIdeas, deleteIdea } from "../api";

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const res = await getIdeas();
        setIdeas(res.data);
      } catch (err) {
        console.error("Failed to load ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await deleteIdea(id);
    setIdeas(ideas.filter((idea) => idea._id !== id));
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>All Ideas</h1>
        <Link to="/">+ Submit New Idea</Link>
      </div>

      {ideas.length === 0 && <p>No ideas yet. Submit your first one!</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {ideas.map((idea) => (
          <div
            key={idea._id}
            onClick={() => navigate(`/ideas/${idea._id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>{idea.title}</h3>
              <button
                onClick={(e) => handleDelete(idea._id, e)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
            <p style={{ color: "#666", marginTop: "8px" }}>
              {idea.description}
            </p>
            <small style={{ color: "#999" }}>
              {new Date(idea.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
