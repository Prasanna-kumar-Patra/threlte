<script>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'

  export let simulationState
  export let energyData

  let ball
  let lastTime = 0
  const timeStep = 1/60 // 60 FPS

  function updatePhysics(time) {
    if (!ball || get(simulationState).isPaused) return
    
    const state = get(simulationState)
    const deltaTime = timeStep

    // Update position and velocity
    state.time += deltaTime
    const newHeight = state.height - 0.5 * state.gravitationalAcceleration * state.time ** 2
    
    if (newHeight <= 0) {
      // Reset when ball hits ground
      state.time = 0
      state.height = state.height
      state.velocity = 0
    } else {
      state.height = newHeight
      state.velocity = state.gravitationalAcceleration * state.time
    }

    // Calculate energies
    const mass = state.mass
    const g = state.gravitationalAcceleration
    const potentialEnergy = mass * g * state.height
    const kineticEnergy = 0.5 * mass * state.velocity ** 2

    energyData.set({
      potentialEnergy,
      kineticEnergy
    })

    simulationState.set(state)
  }

  onMount(() => {
    let animationFrame
    function animate(time) {
      updatePhysics(time)
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  })
</script>

<T.PerspectiveCamera
  position={[10, 10, 10]}
  fov={45}
>
  <OrbitControls enableZoom={true} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} intensity={1} />
<T.AmbientLight intensity={0.2} />

<!-- Ground plane -->
<T.Mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
  <T.PlaneGeometry args={[10, 10]} />
  <T.MeshStandardMaterial color="#cccccc" />
</T.Mesh>

<!-- Ball -->
<T.Mesh
  bind:ref={ball}
  position={[0, $simulationState.height, 0]}
>
  <T.SphereGeometry args={[0.5, 32, 32]} />
  <T.MeshStandardMaterial color="#ff3e00" />
</T.Mesh>

<!-- Height reference line -->
<T.Line
  points={[[0, 0, 0], [0, $simulationState.height, 0]]}
  color="#666666"
/>
