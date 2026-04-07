import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getIdeaById } from "../api";
import ReportCard from "../components/ReportCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

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

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      setExporting(true);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: (document) => {
          const elements = document.querySelectorAll("*");
          elements.forEach((el) => {
            const style = el.style;
            style.color = style.color || "#000000";
            style.backgroundColor = style.backgroundColor || "transparent";
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${idea.title}-report.pdf`);
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExporting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading report...</p>;

  if (!idea) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/dashboard"
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back
          </Link>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>

        <div ref={reportRef} className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold">{idea.title}</h1>
          <p className="text-gray-600 mt-2">{idea.description}</p>

          <div className="border-t my-6"></div>

          <ReportCard report={idea.report} />
        </div>
      </div>
    </div>
  );
}

export default IdeaDetail;
