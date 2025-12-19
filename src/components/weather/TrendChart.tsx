import React from 'react';
import type { ForecastData } from '@/types/weather';

interface TrendChartProps {
  forecast: ForecastData;
  daysToShow: number;
}

export function TrendChart({ forecast, daysToShow }: TrendChartProps) {
  // Group forecasts by day and get daily temperatures
  const dailyTemps = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });

    if (!acc[dateKey]) {
      acc[dateKey] = {
        temps: [],
        label: dateKey,
      };
    }

    acc[dateKey].temps.push(item.main.temp);
    return acc;
  }, {} as Record<string, { temps: number[]; label: string }>);

  // Get average temperature for each day
  const dailyData = Object.values(dailyTemps)
    .slice(0, daysToShow)
    .map((day) => ({
      label: day.label,
      temp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
    }));

  // Calculate chart dimensions
  const maxTemp = Math.max(...dailyData.map((d) => d.temp));
  const minTemp = Math.min(...dailyData.map((d) => d.temp));
  const tempRange = maxTemp - minTemp || 1; // Avoid division by zero
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  // Calculate points for the line
  const points = dailyData.map((data, index) => {
    const x = padding + (index / Math.max(dailyData.length - 1, 1)) * (chartWidth - 2 * padding);
    const y = 20 + (chartHeight - 40) - ((data.temp - minTemp) / tempRange) * (chartHeight - 40);
    return { x, y, temp: data.temp, label: data.label };
  });

  // Generate SVG path
  const pathD = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      return `L ${point.x} ${point.y}`;
    })
    .join(' ');

  // Generate area path (filled gradient)
  const areaPathD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : '';

  return (
    <div className="w-full p-6 modern-card rounded-xl">
      <h3 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-urbanist)' }}>
        Tendance des températures ({dailyData.length} jours)
      </h3>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight + 60}`}
        className="w-full h-auto"
        preserveAspectRatio="xMinYMid meet"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(147, 197, 253)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(147, 197, 253)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => (
          <line
            key={percent}
            x1={padding}
            y1={20 + (percent / 100) * (chartHeight - 40)}
            x2={chartWidth - padding}
            y2={20 + (percent / 100) * (chartHeight - 40)}
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        ))}

        {/* Area fill */}
        <path d={areaPathD} fill="url(#tempGradient)" />

        {/* Temperature line */}
        <path
          d={pathD}
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            {/* Circle */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
            />

            {/* Temperature label */}
            <text
              x={point.x}
              y={point.y - 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="rgb(55, 65, 81)"
            >
              {point.temp}°
            </text>

            {/* Date label */}
            <text
              x={point.x}
              y={chartHeight + 30}
              textAnchor="middle"
              fontSize="11"
              fill="rgb(107, 114, 128)"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-400"></div>
          <span className="text-gray-600">Température moyenne</span>
        </div>
      </div>
    </div>
  );
}
