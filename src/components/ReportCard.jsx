function ReportCard({ report }) {
  const riskColor = {
    Low: "green",
    Medium: "orange",
    High: "red",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        marginTop: "24px",
      }}
    >
      <Section title="Problem Summary" content={report.problem} />
      <Section title="Customer Persona" content={report.customer} />
      <Section title="Market Overview" content={report.market} />

      <div>
        <h3>Competitors</h3>
        {report.competitor.map((c) => (
          <div
            key={c.name}
            style={{
              marginBottom: "8px",
              paddingLeft: "12px",
              borderLeft: "3px solid #ddd",
            }}
          >
            <strong>{c.name}</strong>
            <p style={{ margin: "4px 0", color: "#555" }}>
              {c.differentiation}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3>Suggested Tech Stack</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {report.tech_stack.map((tech) => (
            <span
              key={tech}
              style={{
                background: "#f0f0f0",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <div>
          <h3>Risk Level</h3>
          <span
            style={{
              color: riskColor[report.risk_level] || "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {report.risk_level}
          </span>
        </div>
        <div>
          <h3>Profitability Score</h3>
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>
            {report.profitability_score}
            <span style={{ fontSize: "16px", color: "#999" }}>/100</span>
          </span>
        </div>
      </div>

      <Section title="Justification" content={report.justification} />
    </div>
  );
}

function Section({ title, content }) {
  return (
    <div>
      <h3>{title}</h3>
      <p style={{ color: "#444", lineHeight: "1.6" }}>{content}</p>
    </div>
  );
}

export default ReportCard;
