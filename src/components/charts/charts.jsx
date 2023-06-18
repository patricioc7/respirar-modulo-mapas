import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button, Card } from "react-bootstrap";
import { transformToCsv } from "../../services/jsonToCsvConverter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function CustomChart({
  historyData,
  stationName,
  parameter,
  fromDate,
  toDate,
}) {
  const isSameDay = fromDate === toDate;
  const handleDownloadData = () => {
    const timeTitle = isSameDay
      ? ` del día ${fromDate}`
      : `desde ${fromDate} hasta ${toDate}`;
    const fileName = `${stationName} - ${parameter}  ${timeTitle}.csv`;
    const csv = transformToCsv(historyData.values);
    if (window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob([csv]);
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const a = document.createElement("a");
      a.href = "data:attachment/csv," + encodeURIComponent(csv);
      a.target = "_blank";
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    }
  };

  const values = historyData?.values;

  const data = {
    labels: values.length
      ? values.map((value) => {
          const date = new Date(value.date);
          return date.toLocaleString("es-AR");
        })
      : ["No data"],
    datasets: [
      {
        label: historyData.label ? historyData.label : "",
        data: values.length ? values.map((value) => value.value) : [""],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: historyData.label
          ? historyData.label + " de la estación " + stationName
          : "No hay información acerca de esta estación",
      },
    },
  };

  return (
    <>
      {values.length ? (
        <div className="contenerdorGrafico">
          <Card>
            <Line options={options} data={data} />
          </Card>
          <div className="contenedorBotonDescarga">
            <Button className="botonDescargar" onClick={handleDownloadData}>
              Descargar como CSV
            </Button>
          </div>
        </div>
      ) : (
        <div className="contenedorNoData">
          <p className="noData">No se encontraron datos para esta estación.</p>
        </div>
      )}
    </>
  );
}
