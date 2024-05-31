'use client';
import { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Image from 'next/image';
import axios from 'axios';
import styles from '../globals.css';

export default function Home() {
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState('/images/graph.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the Excel file
        const response = await fetch('/data/Training_excel.xlsx');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.arrayBuffer();
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
      } catch (err) {
        setError(err.message);
      }
    };

    const checkImage = async () => {
      try {
        // Try to fetch the image
        const response = await fetch(imageSrc);
        if (!response.ok) {
          throw new Error('Image not found');
        }
      } catch (err) {
        // If image is not found, call the Flask server to load the image
        try {
          await axios.get('http://localhost:5000/fetch-image');
          setImageSrc(imageSrc + `?t=${new Date().getTime()}`); // Update src to avoid caching
        } catch (flaskErr) {
          setError('Failed to load the image from server');
        }
      }
    };

    fetchData();
    checkImage();
  }, [imageSrc]);

  return (
    <div className={styles.container}>
      <header>
        <h1>Food Numbers Dashboard</h1>
      </header>
      {error && <div className={styles.error}>Error: {error}</div>}
      {/* {chartData && (
        <div className={styles.chartContainer}>
          <h2>Historical and Predicted Food Numbers (5 Years)</h2>
          <Line data={chartData} />
        </div>
      )} */}
      <div className={styles.imageContainer}>
        <h2>Predictions Graph</h2>
        <Image src={imageSrc} alt="Graph showing predictions" width={800} height={600} />
      </div>
      <div className={styles.tableContainer}>
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
