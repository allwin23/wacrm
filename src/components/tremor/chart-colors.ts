// ============================================================
// Tremor chartColors — Editorial Monochrome adaptation
// ============================================================

export type ColorUtility = "bg" | "stroke" | "fill" | "text"

export const chartColors = {
  blue: {
    bg: "bg-foreground",
    stroke: "stroke-foreground",
    fill: "fill-foreground",
    text: "text-foreground",
  },
  emerald: {
    bg: "bg-muted-foreground",
    stroke: "stroke-muted-foreground",
    fill: "fill-muted-foreground",
    text: "text-muted-foreground",
  },
  violet: {
    bg: "bg-foreground",
    stroke: "stroke-foreground",
    fill: "fill-foreground",
    text: "text-foreground",
  },
  amber: {
    bg: "bg-muted-foreground",
    stroke: "stroke-muted-foreground",
    fill: "fill-muted-foreground",
    text: "text-muted-foreground",
  },
  gray: {
    bg: "bg-muted-foreground",
    stroke: "stroke-muted-foreground",
    fill: "fill-muted-foreground",
    text: "text-muted-foreground",
  },
  cyan: {
    bg: "bg-border",
    stroke: "stroke-border",
    fill: "fill-border",
    text: "text-muted-foreground",
  },
  pink: {
    bg: "bg-foreground",
    stroke: "stroke-foreground",
    fill: "fill-foreground",
    text: "text-foreground",
  },
  lime: {
    bg: "bg-muted-foreground",
    stroke: "stroke-muted-foreground",
    fill: "fill-muted-foreground",
    text: "text-muted-foreground",
  },
  fuchsia: {
    bg: "bg-foreground",
    stroke: "stroke-foreground",
    fill: "fill-foreground",
    text: "text-foreground",
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string
  }
}

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    bg: "bg-muted",
    stroke: "stroke-muted-foreground",
    fill: "fill-muted-foreground",
    text: "text-muted-foreground",
  }
  return chartColors[color]?.[type] ?? fallbackColor[type]
}
