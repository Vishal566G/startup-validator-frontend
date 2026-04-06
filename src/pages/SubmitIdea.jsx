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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">
          Validate Your Startup Idea
        </h1>
        <p className="text-gray-500 mb-6">
          Get an AI-powered analysis in seconds.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Idea title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            placeholder="Describe your idea..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Analyzing..." : "Validate Idea"}
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          <Link
            to="/dashboard"
            className="hover:underline font-medium"
          >
            View all ideas →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SubmitIdea;