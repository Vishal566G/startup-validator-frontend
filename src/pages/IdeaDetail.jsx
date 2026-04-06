import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getIdeaById } from "../api";
import ReportCard from "../components/ReportCard";

function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setLoading(true);
        const res = await getIdeaById(id);
        setIdea(res.data);
      } catch (err) {
        console.error("Error fetching idea:", err);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "60px" }}>
        Loading report...
      </p>
    );
  if (!idea) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
      <Link to="/dashboard" style={{ display: "block", marginBottom: "24px" }}>
        ← Back to Dashboard
      </Link>
      <h1>{idea.title}</h1>
      <p style={{ color: "#666" }}>{idea.description}</p>
      <hr />
      <ReportCard report={idea.report} />
    </div>
  );
}

export default IdeaDetail;
