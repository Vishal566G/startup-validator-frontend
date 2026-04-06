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
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Ideas</h1>
          <Link
            to="/"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + New Idea
          </Link>
        </div>

        {ideas.length === 0 && (
          <p className="text-gray-500">
            No ideas yet. Submit your first one!
          </p>
        )}

        <div className="flex flex-col gap-4">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              onClick={() => navigate(`/ideas/${idea._id}`)}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  {idea.title}
                </h3>
                <button
                  onClick={(e) => handleDelete(idea._id, e)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>

              <p className="text-gray-600 mt-2">
                {idea.description}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(idea.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;