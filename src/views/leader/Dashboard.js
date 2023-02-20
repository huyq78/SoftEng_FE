import React, { useEffect, useState } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
import { CChart } from "@coreui/react-chartjs";
import { da } from "date-fns/locale";

export default function Dashboard() {
  const [citizen, setCitizen] = useState(null);
  const [citizenData, setCitizenData] = useState();
  const [household, setHousehold] = useState(null);
  useEffect(() => {
    fetchCitizen();
    fetchHousehold();
  }, []);

  const fetchCitizen = () => {
    fetch("http://localhost:5000/citizen/statistic", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCitizen(data.data.total.toString());
        setCitizenData(data.data);
      });
  };

  const fetchHousehold = () => {
    fetch("http://localhost:5000/household/statistic", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHousehold(data.data.total.toString());
      });
  };

  const data = {
    labels: ["Nữ", "Nam", "Khác"],
    datasets: [
      {
        label: ["Nữ", "Nam", "Khác"],
        data: [
          citizenData.femaleTotal,
          citizenData.maleTotal,
          citizenData.otherTotal,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-6/12 xl:w-6/12 px-4 py-4">
          <CardStats
            statSubtitle="Số công dân"
            statTitle={citizen}
            statArrow="up"
            statPercent="3.48"
            statPercentColor="text-emerald-500"
            statDescripiron="Since last month"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-6/12 px-4 py-4">
          <CardStats
            statSubtitle="Số hộ khẩu"
            statTitle={household}
            statArrow="up"
            statPercent="3.48"
            statPercentColor="text-emerald-500"
            statDescripiron="Since last month"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
          <CChart
            type="doughnut"
            data={data}
          />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
