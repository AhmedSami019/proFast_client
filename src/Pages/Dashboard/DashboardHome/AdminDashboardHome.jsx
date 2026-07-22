import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ["deliveryStatus-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels-deliveryStatus-stats");
      return res.data;
    },
  });

  // colors for piechart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
  ];

  const getPieChartData = (data) =>
    data.map((item) => ({
      name: item._id === null ? "Unpaid" : item._id,
      value: item.count,
    }));

  return (
    <div className="m-5">
      <h2 className="text-4xl font-bold">Dashboard</h2>
      <div className="mt-5 space-y-3">
        <p className="text-lg font-semibold">Parcel delivery status</p>
        <div className="stats shadow">
          {stats?.map((item, index) => (
            <div key={index} className="stat">
              <div className="stat-title">
                {item._id === null ? "Unpaid" : item._id.split(/_|-/).join(" ")}
              </div>
              <div className="stat-value">{item.count}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          ))}
        </div>

        {/* piechart */}
        <div>
          <PieChart
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              aspectRatio: 1,
            }}
          >
            <Pie
              data={getPieChartData(stats)}
              labelLine={false}
              fill="#8884d8"
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              isAnimationActive={true}
            >
              {getPieChartData(stats).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
            <Tooltip></Tooltip>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
