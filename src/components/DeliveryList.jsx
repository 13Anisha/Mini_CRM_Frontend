import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

export default function DeliveryList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiClient.get("/delivery")
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden p-4">
      <h2 className="text-xl font-bold mb-4">Delivery Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log._id} className="p-3 border-b flex justify-between">
            <span>{log.campaignName}</span>
            <span>Status: {log.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
