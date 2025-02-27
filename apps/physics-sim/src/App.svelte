<script>
  import { Canvas } from '@threlte/core'
  import Scene from './components/Scene.svelte'
  import Controls from './components/Controls.svelte'
  import EnergyGraph from './components/EnergyGraph.svelte'
  import { writable } from 'svelte/store'

  // Physics simulation parameters
  export const simulationState = writable({
    mass: 1, // kg
    height: 5, // meters
    velocity: 0, // m/s
    isPaused: false,
    time: 0,
    gravitationalAcceleration: 9.81 // m/s²
  })

  export const energyData = writable({
    potentialEnergy: 0,
    kineticEnergy: 0
  })
</script>

<div class="container">
  <div class="simulation">
    <Canvas>
      <Scene {simulationState} {energyData} />
    </Canvas>
  </div>
  
  <div class="controls-container">
    <Controls {simulationState} />
    <EnergyGraph {energyData} />
  </div>
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #f0f0f0;
  }

  .simulation {
    flex: 2;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .controls-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
