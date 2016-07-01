function multilineText(context, text, width){
  var
    len      = text.length
  , strArray = []
  , tmp      = ''
  , i        = 0

  if (len < 1) {
    return strArray
  }

  for (i = 0; i < len; i++) {
    var c = text.charAt(i)
    if (c == '\n') {
      strArray.push(tmp)
      tmp = ''
      continue
    } if (context.measureText(tmp + c).width <= width) {
      tmp += c
    } else {
      strArray.push(tmp)
      tmp = c
    }
  }

  if (tmp.length > 0) {
    strArray.push(tmp)
  }
  return strArray
}

function change(){
  var
    canvas  = document.getElementById('canvas')
  , text    = document.getElementById('text')
  , context = canvas.getContext('2d')
  , arr     = multilineText(context, text.value, 600)

  context.font      = '10pt Source Code Pro'
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgb(30,30,30)'
  context.fillRect(0, 0, 600, 800)
  context.fillStyle = 'rgb(200,200,200)'

  for (var i = 0; i < arr.length; i++) {
    context.fillText(arr[i], 10, 20 + (i * 20))
  }

  var jpg = canvas.toDataURL()
  document.getElementById('newImg').src = jpg
}

var cm = CodeMirror.fromTextArea(document.getElementById('text'), {
  mode        : 'javascript'
, theme       : 'zeemirror'
, lineNumbers : true
})

cm.setSize(600, 800)

function go(){
  cm.save()
  change()
}
