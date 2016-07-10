'use strict'

var Audio = window.AudioContext || window.webkitAudioContext
var audioCtx = new Audio()

var canvas = document.createElement('canvas')

canvas.setAttribute('width', '1024px')
canvas.setAttribute('height', '400px')

var ctx = canvas.getContext('2d')
var raw = undefined

document.body.appendChild(canvas)

;(function paintFrame () {
  if (raw) {
    ctx.clearRect(0, 0, 1024, 400)
    raw.forEach(function (v, i) {
      var n = (v + 1) / 2
      ctx.fillRect(i, n * 400, 2, 2)
    })
  }

  window.requestAnimationFrame(paintFrame)
})()

navigator.webkitGetUserMedia({ audio: true }, function (stream) {
  var mic = audioCtx.createMediaStreamSource(stream)
  var processor = audioCtx.createScriptProcessor(1024, 1, 1)

  mic.connect(processor)
  processor.connect(audioCtx.destination)

  processor.onaudioprocess = function (e) {
    raw = Array.prototype.slice.call(e.inputBuffer.getChannelData(0), 0)
  }
}, function (err) {})
