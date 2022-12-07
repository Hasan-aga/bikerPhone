export type lineData {
    dataSets: [
      {
        values: [
          number or
          {
            x: number,
            y: number,
            marker: string
          }
        ],
        label: string, // required
        config: {
          ...ConfigTypes.common,
          ...ConfigTypes.barLineScatterCandleBubble,
          ...ConfigTypes.lineScatterCandleRadar,
          ...ConfigTypes.lineRadar,
          circleRadius: number,
          drawCircles: bool,
          mode: bool,
          lineWidth: number, // min: 0, max: 10
          drawCubicIntensity: number,
          circleColor: number,
          circleColors: [number],
          circleHoleColor: number,
          drawCircleHole: bool,
          dashedLine: {
            lineLength: number, // required
            spaceLength: number, // required
            phase: number
          },
          fillFormatter: {
              min: number // required
          }
        }
      }
    ]
  }