import { Bar } from "react-chartjs-2";

const ChartRenderer = ({ xField, yField, data }) => {
  return (
    <Bar
      data={{
        labels: data.map((row) => row[xField]),
        datasets: [{ label: yField, data: data.map((row) => row[yField]) }],
      }}
    />
  );
};
