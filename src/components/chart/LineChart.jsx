import React, { useEffect, useState } from 'react'
import { Line} from 'react-chartjs-2'
import { Chart as chartjs,LineElement,CategoryScale,LinearScale,PointElement,Tooltip,Legend } from 'chart.js'
import axiosInstance from '../../services/AxiosInstance';

chartjs.register(LineElement,CategoryScale,LinearScale,PointElement,Tooltip,Legend);

const LineChart = () => {

  const [chartData,setChartData] = useState({
    labels :["Jan", "Feb", "Mar", "Apr", "May", "Jun","july","Aug","Oct","Nov","Dec"],
    dataPoints: Array(12).fill(0), // Default to 12 zeros
  })

  useEffect(()=>{
    fetchChartData()
  },[])

  const fetchChartData = async ()=>{
    try {
      
      const response = await axiosInstance.get('/admin/chartData')
      
      setChartData((prev) => ({
        ...prev, 
        dataPoints: response.data.response.dataPoints || Array(12).fill(0),
      }));
      
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  }
  



    const data = {
        labels:chartData.labels,
        datasets: [
          {
            label: "Monthly Bookings",
            data: chartData.dataPoints,
            borderColor: "#829bfc",
            backgroundColor: "#829bfc",
            pointBackgroundColor: "#829bfc",
            tension: 0.5, 
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide grid lines on X-axis
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true, // Show grid lines on Y-axis
            },
          },
        },
      };
    
      return <Line data={data} options={options} />;
}

export default LineChart