'use client';
import { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Image from 'next/image';
import axios from 'axios';

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
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
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
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Food Numbers Dashboard</h1>
      </header>
      {error && <div className="text-red-600 font-bold text-center mb-4">Error: {error}</div>}
     
      <div className="my-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Predictions Graph</h2>
        <Image src={imageSrc} alt="Graph showing predictions" width={800} height={600} className="mx-auto border-2 border-gray-300 rounded-lg shadow-md"/>
      </div>
      <div className="my-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                {Object.keys(tableData[0] || {}).map((key) => (
                  <th key={key} className="py-3 px-6 text-left">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="py-3 px-6 border-b border-gray-200">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}