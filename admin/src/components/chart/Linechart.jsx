import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import "./chart.css";
// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, ...];

// const renderLineChart = (
//   <LineChart width={600} height={300} data={data}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//     <CartesianGrid stroke="#ccc" />
//     <XAxis dataKey="name" />
//     <YAxis />
//   </LineChart>
// );

export default function Linechart({ title, data, dataKey, grid }) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
          {grid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
          <XAxis dataKey="name" />
          <YAxis  stroke="#5550bd" />
          <Tooltip />
          {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}