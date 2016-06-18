navigator.getUserMedia = (
  navigator.getUserMedia       ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia    ||
  navigator.msGetUserMedia
)

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var analyser = audioCtx.createAnalyser()
analyser.minDecibels           = -90
analyser.maxDecibels           = -20
analyser.smoothingTimeConstant = .89

var wrapper   = document.querySelector('.wrapper')
var canvas    = document.querySelector('.visualizer')
var canvasCtx = canvas.getContext('2d')
canvas.setAttribute('width'  , wrapper.clientWidth)
canvas.setAttribute('height' , wrapper.clientHight)

navigator.getUserMedia({audio : true}, visualize, console.error.bind(console))

function visualize (stream) {
  audioCtx.createMediaStreamSource(stream).connect(analyser)
  WIDTH = canvas.width
  HEIGHT = canvas.height

  analyser.fftSize = 256
  var bufferLength = analyser.frequencyBinCount
  var dataArray    = new Uint8Array(bufferLength)
  var start        = Date.now()

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

  draw()

  function draw () {
    drawVisual = requestAnimationFrame(draw)

    analyser.getByteFrequencyData(dataArray)

    canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

    var barWidth = (WIDTH / bufferLength) / 1.5
    var x        = 0
    var diff     = -(Date.now() - start) / 30
    var barHeight

    for (var i = 1; i < bufferLength; i++) {
      barHeight = dataArray[i]

      var color = (((i / bufferLength) * 270) + diff) % 360

      canvasCtx.fillStyle = 'hsla(' + -color + ', ' + Math.max(50, 100 * barHeight / 128) + '%,' + Math.min(50, barHeight / 3) + '%, 1)'
      canvasCtx.fillRect(WIDTH / 2 + x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)
      canvasCtx.fillRect(WIDTH / 2 - x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)
      x += barWidth + 3
    }
  }
}
