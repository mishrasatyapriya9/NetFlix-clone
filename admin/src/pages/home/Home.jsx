import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import LineChart from "../../components/chart/Linechart.jsx";
export default function Home() {
  const [userStats, setuserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/stats`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFiYThlZWIzZGM2YjY4OTk3NzdlMzQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTM1ODk0MDQsImV4cCI6MTcxNDE5NDIwNH0.d8CY94WgE1jnQ7wj7crWIqvNfaLnMqxcMqleuM39flk",
          },
        });
        // console.log(res.data);
        // setuserStats(res.data);
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setuserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "NEW User": item.total }, //the value is now 2 ,3 ,4 to make big values i just added random numbers.LATER ON WHEN TOTAL USERS NUMBERS INCREASES THEN DELETE IT
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  // console.log(userStats); this data is form backend
  // console.log(userData); this data is demo data

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="NEW User" />
      {/* userStats is the original data fetch from backend */}
      {/* USER DATA USED BELOW IS FROM DEMO CHART DATA */}
      <LineChart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
