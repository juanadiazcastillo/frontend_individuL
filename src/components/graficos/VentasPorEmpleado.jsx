import { Card, Button } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Pie, Line } from 'react-chartjs-2';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const VentasPorEmpleado = ({ empleados, total_ventas }) => {
  const chartRef = useRef(null);

  // Data configuration for the chart
  const data = {
    labels: empleados, // Employee names for the x-axis labels
    datasets: [
      {
        label: 'Ventas(C$)', // Label for the dataset
        data: total_ventas, // Sales data for each employee
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(32, 85, 121, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(29, 155, 46, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgb(43, 155, 15)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgb(110, 71, 189)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
      }
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from zero
        title: {
          display: true,
          text: 'Córdobas (C$)', // Title for the y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: 'Empleados', // Title for the x-axis
        },
      },
    },
  };

  // Function to generate the PDF report
  const generarPDF = () => {
    const doc = new jsPDF();

    // Header section of the PDF
    doc.setFillColor(28, 41, 51); // Set header background color
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F"); // Draw header rectangle
    doc.setTextColor(255, 255, 255); // Set header text color
    doc.setFontSize(22); // Set header font size
    doc.text("Reporte de Ventas por Mes", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center" // Center align the header text
    });

    // Capture chart as an image
    const chartInstance = chartRef.current; // Get the chart instance
    const chartCanvas = chartInstance?.canvas; // Get the chart canvas
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0); // Convert canvas to image data URL

    if (chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100); // Add the chart image to the PDF
    }

    // Data table section of the PDF
    const columnas = ["Mes", "Ventas (C$)"]; // Column headers for the table
    // Map employee data to table rows
    const filas = empleados.map((empleado, index) => [empleado, total_ventas[index]]);

    // Add the table to the PDF using jspdf-autotable
    autoTable(doc, {
      head: [columnas], // Table headers
      body: filas, // Table body data
      startY: 150, // Starting Y position for the table
      theme: "grid", // Table theme
      styles: {
        fontSize: 10,
        cellPadding: 2
      },
      margin: {
        top: 20,
        left: 14,
        right: 14
      },
    });

    // Generate a dynamic file name for the PDF
    const fecha = new Date(); // Current date
    const dia = String(fecha.getDate()).padStart(2, '0'); // Day with leading zero
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Month with leading zero (getMonth is 0-indexed)
    const anio = fecha.getFullYear(); // Full year
    const nombreArchivo = `VentasPorMes_${dia}${mes}${anio}.pdf`; // Construct file name

    // Save the PDF
    doc.save(nombreArchivo);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Ventas por empleado</Card.Title>
        {/* Chart container with styling for centering */}
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>
        {/* Button to generate report, centered below the chart */}
        <div className="flex justify-center mt-4">
          <Button className="btn btn-success" onClick={generarPDF}>
            Generar Reporte <i className="bi bi-download"></i> {/* Download icon */}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;
