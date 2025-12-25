import React, { useEffect, useState } from 'react';
import api from './api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

function App() {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/store') // change to your real endpoint
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load store data');
        setLoading(false);
      });
  }, []);

  const rowExpansionTemplate = (rowData) => (
    <DataTable value={rowData.records} size="small" stripedRows>
      {/* <Column field="storeId" header="Store ID" /> */}
      <Column field="totalSale" header="Total Sale" />
      <Column field="fuelGallon" header="Fuel Gallon" />
      <Column field="capturedTime" header="Captured Time" />
    </DataTable>
  );

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <Message severity="error" text={error} />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Stores Daily Records</h2>

      <DataTable
        value={data}
        dataKey="storeId"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        stripedRows
        paginator
        rows={10}
      >
        <Column expander style={{ width: '3rem' }} />
        <Column field="storeId" header="Store ID" sortable />
        <Column header="Records Count" body={(row) => row.records.length} />
      </DataTable>
    </div>
  );
}

export default App;
