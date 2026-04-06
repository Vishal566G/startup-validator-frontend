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
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
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
    return (
      <p style={{ textAlign: "center", marginTop: "60px" }}>
        Loading report...
      </p>
    );
  if (!idea) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/dashboard"
          style={{ display: "block", marginBottom: "24px" }}
        >
          ← Back to Dashboard
        </Link>
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {exporting ? "Exporting..." : "Export PDF"}
        </button>
      </div>

      <div ref={reportRef}>
        <h1>{idea.title}</h1>
        <p style={{ color: "#666" }}>{idea.description}</p>
        <hr />
        <ReportCard report={idea.report} />
      </div>
    </div>
  );
}

export default IdeaDetail;
