import React from "react"
import { GridVisualizationProps } from "../model"
import "../styles/GridVisualization.css"

const MAX_CELLS = 10000

export function GridVisualization({
  columns,
  rows,
  margin,
  visualMargin,
  gutter,
}: GridVisualizationProps) {
  const effectiveMargin: number = margin === 0 ? 0 : visualMargin
  const effectiveWidth = `calc(100% - ${2 * effectiveMargin}px)`
  const effectiveHeight = `calc(100% - ${2 * effectiveMargin}px)`

  const totalCells = columns * rows
  const isOverLimit = totalCells > MAX_CELLS

  const renderCells = isOverLimit
    ? Math.floor(Math.sqrt(MAX_CELLS))
    : Math.min(columns, rows)
  const cells = Array(
    isOverLimit ? renderCells * renderCells : columns * rows
  ).fill(null)

  const verticalGutters = Array(
    isOverLimit ? renderCells - 1 : columns - 1
  ).fill(null)
  const horizontalGutters = Array(
    isOverLimit ? renderCells - 1 : rows - 1
  ).fill(null)
  const fixedGutterSize = 2

  return (
    <div
      className="grid-visualization-container"
      style={{
        padding: `${effectiveMargin}px`,
      }}
    >
      <div
        className="grid-visualization-inner"
        style={{
          gridTemplateColumns: `repeat(${
            isOverLimit ? renderCells : columns
          }, 1fr)`,
          gridTemplateRows: `repeat(${isOverLimit ? renderCells : rows}, 1fr)`,
        }}
      >
        {cells.map((_, index) => (
          <div key={index} className="grid-cell" />
        ))}
      </div>
      {gutter > 0 && (
        <div
          className="gutter-visualization"
          style={{
            width: effectiveWidth,
            height: effectiveHeight,
            left: `${effectiveMargin}px`,
            top: `${effectiveMargin}px`,
          }}
        >
          {verticalGutters.map((_, index) => (
            <div
              key={`v-${index}`}
              className="vertical-gutter"
              style={{
                left: `${
                  ((index + 1) / (isOverLimit ? renderCells : columns)) * 100
                }%`,
                width: `${fixedGutterSize}px`,
              }}
            />
          ))}
          {horizontalGutters.map((_, index) => (
            <div
              key={`h-${index}`}
              className="horizontal-gutter"
              style={{
                top: `${
                  ((index + 1) / (isOverLimit ? renderCells : rows)) * 100
                }%`,
                height: `${fixedGutterSize}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
