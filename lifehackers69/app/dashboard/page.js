'use client';
import { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Image from 'next/image';
import graphImage from '../../public/images/graph.png';

export default function Home() {
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch and process the Excel file
    fetch('/data/Training_excel.xlsx')
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        // Process data for chart
        const labels = jsonData.map((item) => item.Date); // Assumes 'Date' column
        const values = jsonData.map((item) => item['Total Food Numbers']); // Assumes 'Total Food Numbers' column

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Food Numbers',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        });

        // Set table data
        setTableData(jsonData);
      });
  }, []);

  return (
    <div>
      <h1>Food Numbers Dashboard</h1>
      {/* {chartData && (
        <div>
          <h2>Historical and Predicted Food Numbers (5 Years)</h2>
          <Line data={chartData} />
        </div>
      )} */}
      <div className="image-container">
        <h2>Predictions Graph</h2>
        <Image src={graphImage} alt="Graph showing predictions" />
      </div>
      <div className="table-container">
        <h2>Data Table</h2>
        <table>
          <thead>
            <tr>
              {Object.keys(tableData[0] || {}).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
