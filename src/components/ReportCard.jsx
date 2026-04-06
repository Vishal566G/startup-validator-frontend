function ReportCard({ report }) {
  const riskColor = {
    Low: "text-green-600",
    Medium: "text-yellow-500",
    High: "text-red-600",
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <Section title="Problem Summary" content={report.problem} />
      <Section title="Customer Persona" content={report.customer} />
      <Section title="Market Overview" content={report.market} />

      <div>
        <h3 className="font-semibold mb-2">Competitors</h3>
        {report.competitor.map((c) => (
          <div
            key={c.name}
            className="border-l-4 border-gray-300 pl-3 mb-2"
          >
            <p className="font-medium">{c.name}</p>
            <p className="text-gray-600 text-sm">
              {c.differentiation}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Suggested Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {report.tech_stack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-10 items-center">
        <div>
          <h3 className="font-semibold">Risk Level</h3>
          <p
            className={`font-bold text-lg ${
              riskColor[report.risk_level]
            }`}
          >
            {report.risk_level}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Profitability Score
          </h3>
          <p className="text-3xl font-bold">
            {report.profitability_score}
            <span className="text-sm text-gray-400">
              /100
            </span>
          </p>
        </div>
      </div>

      <Section
        title="Justification"
        content={report.justification}
      />
    </div>
  );
}

function Section({ title, content }) {
  return (
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-gray-700 leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export default ReportCard;