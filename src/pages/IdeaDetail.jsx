import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getIdeaById } from "../api";
import ReportCard from "../components/ReportCard";
import jsPDF from "jspdf";

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

  const handleExportPDF = () => {
    if (!idea) return;

    try {
      setExporting(true);
      const pdf = new jsPDF("p", "mm", "a4");
      const report = idea.report;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 16;
      const maxWidth = pageWidth - margin * 2;
      let y = 20;

      const addText = (
        text,
        fontSize = 12,
        isBold = false,
        color = [0, 0, 0],
      ) => {
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(String(text), maxWidth);
        lines.forEach((line) => {
          if (y > 270) {
            pdf.addPage();
            y = 20;
          }
          pdf.text(line, margin, y);
          y += fontSize * 0.5;
        });
        y += 4;
      };

      const addDivider = () => {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 6;
      };

      // Title
      addText(idea.title, 22, true, [30, 30, 30]);
      addText(idea.description, 11, false, [100, 100, 100]);
      addDivider();

      // Sections
      addText("Problem Summary", 14, true);
      addText(report.problem, 11);
      addDivider();

      addText("Customer Persona", 14, true);
      addText(report.customer, 11);
      addDivider();

      addText("Market Overview", 14, true);
      addText(report.market, 11);
      addDivider();

      addText("Competitors", 14, true);
      report.competitor.forEach((c, i) => {
        addText(`${i + 1}. ${c.name}`, 11, true);
        addText(c.differentiation, 11);
      });
      addDivider();

      addText("Suggested Tech Stack", 14, true);
      addText(report.tech_stack.join(", "), 11);
      addDivider();

      // Risk + Score
      const riskColors = {
        Low: [34, 139, 34],
        Medium: [255, 140, 0],
        High: [200, 0, 0],
      };
      addText("Risk Level", 14, true);
      addText(
        report.risk_level,
        12,
        true,
        riskColors[report.risk_level] || [0, 0, 0],
      );
      y += 2;

      addText("Profitability Score", 14, true);
      addText(`${report.profitability_score} / 100`, 12, true, [30, 100, 200]);
      addDivider();

      addText("Justification", 14, true);
      addText(report.justification, 11);

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
