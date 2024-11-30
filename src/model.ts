/**
 * This file contains the typescript interfaces for the plugin events.
 */

export interface ThemePluginEvent {
  type: "theme"
  content: string
}

export interface SplitSettings {
  columns: number
  rows: number
  gutter: number
  margin: number
}

export interface SplitPluginEvent {
  type: "split"
  settings: SplitSettings
}

export type PluginMessageEvent = ThemePluginEvent | SplitPluginEvent

export interface GridVisualizationProps {
  columns: number
  rows: number
  gutter: number
  margin: number
  visualMargin: number
}
