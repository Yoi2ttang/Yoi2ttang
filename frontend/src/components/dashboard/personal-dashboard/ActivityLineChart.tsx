"use client"

import { ChartData, ChartOptions } from "chart.js"
import type { FC } from "react"
import { Line } from "react-chartjs-2"

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"

ChartJS.register(
  CategoryScale, // 범주 차트
  LinearScale, // 선형 차트
  PointElement, // 점 요소
  LineElement, // 선 요소
  Tooltip, // 툴팁
  Legend, // 범례
)

interface ActivityLineChartProps {
  activityData: {
    count: number
    date: string
  }[]
}

const ActivityLineChart: FC<ActivityLineChartProps> = ({ activityData }) => {
  const label = activityData?.map((item) => {
    const date = item.date.split("-")
    return `${date[1]}. ${date[2]}`
  })
  const data = {
    labels: label,
    datasets: [
      {
        label: "점령한 타일",
        data: activityData?.map((item) => item.count),
        borderColor: "#ffac9d",
        fill: true,
        tension: 0.4, // 선 곡률
      },
    ],
  } as ChartData<"line", number[], string>

  const options = {
    color: "#ff5434", // 선 색상
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          boxHeight: 100,
        },
      },
    },
    scales: {
      x: {
        grid: {
          tickBorderDashOffset: 10, // 그리드 선 두께
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    responsive: true, // 반응형 모드
  } as ChartOptions<"line">
  return (
    <div className="aspect-video">
      <Line data={data} options={options} />
    </div>
  )
}
export default ActivityLineChart
