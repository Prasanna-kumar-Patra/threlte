<script>
  export let simulationState

  function resetSimulation() {
    $simulationState = {
      ...$simulationState,
      time: 0,
      velocity: 0
    }
  }

  function togglePause() {
    $simulationState.isPaused = !$simulationState.isPaused
  }
</script>

<div class="controls">
  <h2>Simulation Controls</h2>
  
  <div class="control-group">
    <label>
      Mass (kg):
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        bind:value={$simulationState.mass}
      />
      <span class="value">{$simulationState.mass.toFixed(1)} kg</span>
    </label>
  </div>

  <div class="control-group">
    <label>
      Initial Height (m):
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        bind:value={$simulationState.height}
      />
      <span class="value">{$simulationState.height.toFixed(1)} m</span>
    </label>
  </div>

  <div class="button-group">
    <button on:click={togglePause}>
      {$simulationState.isPaused ? 'Resume' : 'Pause'}
    </button>
    <button on:click={resetSimulation}>Reset</button>
  </div>
</div>

<style>
  .controls {
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

  .control-group {
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input[type="range"] {
    width: 100%;
  }

  .value {
    font-family: monospace;
  }

  .button-group {
    display: flex;
    gap: 0.5rem;
  }

  button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #ff3e00;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #ff2d00;
  }
</style>
