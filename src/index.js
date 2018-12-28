import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class extends Component {
  constructor(props) {
    super(props)

    const browser = typeof window === 'object'
    const width = browser ? window.innerWidth : props.width
    const height = browser ? window.innerHeight : props.height

    this.state = {
      intervalTracker: null,
      canvasCtx: null,
      height,
      width
    }

    this.canvas = React.createRef()
  }

  static defaultProps = {
    color: 'rgba(255, 255, 255, 0.75)',
    speed: 32,
    max: 32,
    width: 1024,
    height: 768
  }

  static propTypes = {
    color: PropTypes.string,
    speed: PropTypes.number,
    max: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object
  }

  componentDidMount() {
    // Canvas init
    const canvas = this.canvas.current
    const canvasCtx = canvas.getContext('2d')

    const { speed, color } = this.props
    const { width: W, height: H } = this.state
    this.setState({ canvasCtx })

    // Particles
    const { max } = this.props
    const particles = []
    for (let i = 0; i < max; i++) {
      particles.push({
        x: Math.random() * W, // x-coordinate
        y: Math.random() * H, // y-coordinate
        r: Math.random() * 4 + 1, // radius
        d: Math.random() * max // density
      })
    }

    // Draw the flakes
    const draw = () => {
      canvasCtx.clearRect(0, 0, W, H)

      canvasCtx.fillStyle = color
      canvasCtx.beginPath()
      for (let i = 0; i < max; i++) {
        const p = particles[i]
        canvasCtx.moveTo(p.x, p.y)
        canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
      }
      canvasCtx.fill()
      update()
    }

    // Function to move the snowflakes
    // angle will be an ongoing incremental flag. Sin and Cos functions will
    // be applied to it to create vertical + horizontal movements of the flakes
    let angle = 0

    const update = () => {
      angle += 0.01
      for (let i = 0; i < max; i++) {
        const p = particles[i]
        // Updating X and Y coordinates
        // Adding 1 to cos to prevent negative values (which would move flakes upwards)
        // Every particle has its own density to make the downward movement different for each flake
        // Make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2
        p.x += Math.sin(angle) * 2

        // Sending flakes back from the top when it exits
        // Make it more organic with flakes entering from both sides
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            // 2/3 of the flakes
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d }
          } else {
            // If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              // Enter from the left
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d }
            } else {
              // Enter from the right
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d }
            }
          }
        }
      }
    }

    this.setState({ intervalTracker: setInterval(draw, speed) })

    // Animation loop
    this.state.intervalTracker
  }

  componentWillUnmount() {
    this.state.canvasCtx.clearRect(0, 0, this.state.width, this.state.height)
    clearInterval(this.state.intervalTracker)
  }

  render() {
    const { style, ...props } = this.props
    const sx = {
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      ...style
    }

    return (
      <canvas
        ref={this.canvas}
        {...props}
        style={sx}
        width={this.state.width}
        height={this.state.height}
      />
    )
  }
}
