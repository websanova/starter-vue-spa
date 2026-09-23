export interface StatDto {
  calculated_at: string
  group: string
  key: string
  value: {
    count: number
  }
}

export interface Stat {
  calculatedAt: string
  count: number
  group: string
  key: string
}

export interface StatMetric {
  all: number | null
  dayBefore: number | null
  group: string
  name: string
  today: number | null
  yesterday: number | null
}

// Keys arrive flattened as `<metric>_<period>`. Only these suffixes fold into a
// single metric, anything else keeps its whole key and lands on `all`.
const periods = {
  all: 'all',
  day_before: 'dayBefore',
  today: 'today',
  yesterday: 'yesterday',
} as const

export function toStat(dto: StatDto): Stat {
  return {
    calculatedAt: dto.calculated_at,
    count: dto.value.count,
    group: dto.group,
    key: dto.key,
  }
}

export function toStatMetrics(stats: Stat[]): StatMetric[] {
  const suffixes = Object.keys(periods) as Array<keyof typeof periods>
  const metrics: StatMetric[] = []

  for (const stat of stats) {
    const suffix = suffixes.find(period => stat.key.endsWith(`_${period}`))
    const name = suffix ? stat.key.slice(0, -(suffix.length + 1)) : stat.key

    let metric = metrics.find(item => item.group === stat.group && item.name === name)

    if (!metric) {
      metric = {
        all: null,
        dayBefore: null,
        group: stat.group,
        name,
        today: null,
        yesterday: null,
      }

      metrics.push(metric)
    }

    metric[periods[suffix ?? 'all']] = stat.count
  }

  return metrics
}
