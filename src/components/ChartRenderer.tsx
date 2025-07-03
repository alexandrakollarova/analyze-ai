import React, { useRef, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { toPng } from "html-to-image";

export default function ChartRenderer({ data, xKey, yKey, chartType = "bar" }) {
  const chartRef = useRef(null);
  const [type, setType] = useState(chartType);

  const handleDownload = async () => {
    if (chartRef.current) {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 rounded ${type === "bar" ? "bg-primary text-white" : "bg-gray-light text-gray-dark"}`}
          onClick={() => setType("bar")}
        >
          Bar
        </button>
        <button
          className={`px-3 py-1 rounded ${type === "line" ? "bg-primary text-white" : "bg-gray-light text-gray-dark"}`}
          onClick={() => setType("line")}
        >
          Line
        </button>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: 300, background: "#fff" }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yKey} fill="#8884d8" />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={yKey} stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <button onClick={handleDownload} className="mt-2 px-4 py-2 bg-primary text-white rounded">
        Download PNG
      </button>
    </div>
  );
}
