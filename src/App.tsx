import { useState, useEffect, useCallback } from "react"
import { GridVisualization } from "./components/GridVisualization"
import "./App.css"

interface Settings {
  columns: string
  rows: string
  gutter: string
  margin: string
}

function App() {
  const url = new URL(window.location.href)
  const initialTheme = url.searchParams.get("theme")

  const [theme, setTheme] = useState(initialTheme || null)
  const [columns, setColumns] = useState<string>("2")
  const [rows, setRows] = useState<string>("2")
  const [gutter, setGutter] = useState<string>("10")
  const [margin, setMargin] = useState<string>("0")

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "theme") {
        setTheme(event.data.content)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const handleSplit = useCallback(() => {
    const parsedColumns = parseInt(columns) || 0
    const parsedRows = parseInt(rows) || 0

    if (parsedColumns === 0 && parsedRows === 0) {
      // TODO: Add proper error notification
      alert(
        "Columns and rows cannot both be empty or 0. Please enter at least one value."
      )
      return
    }

    // TODO: Implement split functionality using Penpot API
    console.log("Split", {
      columns: parsedColumns,
      rows: parsedRows,
      gutter: parseInt(gutter) || 0,
      margin: parseInt(margin) || 0,
    })
  }, [columns, rows, gutter, margin])

  return (
    <div data-theme={theme} className="p-4">
      <div className="grid-preview mb-4">
        <GridVisualization
          columns={parseInt(columns) || 1}
          rows={parseInt(rows) || 1}
          gutter={parseInt(gutter) || 0}
          margin={parseInt(margin) || 0}
          visualMargin={10}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Columns</label>
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Columns"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Rows</label>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Rows"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Gutter</label>
          <input
            type="number"
            value={gutter}
            onChange={(e) => setGutter(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Gutter"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Margin</label>
          <input
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Margin"
          />
        </div>
      </div>

      <button
        onClick={handleSplit}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Split Anything
      </button>
    </div>
  )
}

export default App
