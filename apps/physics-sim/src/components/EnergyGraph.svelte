<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export let energyData

  let svg
  let width = 0
  let height = 200
  const margin = { top: 20, right: 20, bottom: 30, left: 50 }
  const maxDataPoints = 100
  let data = []

  $: innerWidth = width - margin.left - margin.right
  $: innerHeight = height - margin.top - margin.bottom

  $: xScale = d3.scaleLinear()
    .domain([0, maxDataPoints - 1])
    .range([0, innerWidth])

  $: yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0])

  $: potentialLine = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.potentialEnergy))

  $: kineticLine = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.kineticEnergy))

  // Update graph data when energyData changes
  $: {
    if (data.length >= maxDataPoints) {
      data = [...data.slice(1), $energyData]
    } else {
      data = [...data, $energyData]
    }
  }

  onMount(() => {
    const svgElement = d3.select(svg)

    // Add axes
    const xAxis = svgElement.append('g')
      .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
    
    const yAxis = svgElement.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Update axes when the component updates
    function updateAxes() {
      xAxis.call(d3.axisBottom(xScale))
      yAxis.call(d3.axisLeft(yScale))
    }

    updateAxes()
  })
</script>

<div class="graph" bind:clientWidth={width}>
  <h2>Energy Graph</h2>
  <svg
    bind:this={svg}
    {width}
    {height}
  >
    <g transform="translate({margin.left},{margin.top})">
      <!-- Potential Energy Line -->
      <path
        d={potentialLine(data)}
        class="line potential"
      />
      <!-- Kinetic Energy Line -->
      <path
        d={kineticLine(data)}
        class="line kinetic"
      />
    </g>
  </svg>
  
  <div class="legend">
    <div class="legend-item">
      <span class="legend-color potential"></span>
      <span>Potential Energy</span>
    </div>
    <div class="legend-item">
      <span class="legend-color kinetic"></span>
      <span>Kinetic Energy</span>
    </div>
  </div>
</div>

<style>
  .graph {
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  svg {
    width: 100%;
    height: 200px;
  }

  .line {
    fill: none;
    stroke-width: 2;
  }

  .line.potential {
    stroke: #ff3e00;
  }

  .line.kinetic {
    stroke: #40b3ff;
  }

  .legend {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .legend-color {
    width: 20px;
    height: 3px;
  }

  .legend-color.potential {
    background-color: #ff3e00;
  }

  .legend-color.kinetic {
    background-color: #40b3ff;
  }
</style>
