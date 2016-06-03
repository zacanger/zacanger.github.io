(function(w){
  var sw             = document.body.clientWidth     // viewport width
    , minVPWidth     = 240                           // min viewport size
    , maxVPWidth     = 2600                          // max viewport size
    , vpResizerWidth = 14                            // resize handle width
    , $sgWrapper     = $('#sg-gen-container')        // wrapper
    , $sgViewport    = $('#sg-viewport')             // viewport element
    , $sizePx        = $('.sg-size-px')              // px input
    , $sizeEms       = $('.sg-size-em')              // em input
    , $bodySize      = 16                            // body size
    , discoID        = false
    , fullMode       = true
    , discoMode      = false
    , hayMode        = false
    , hash           = window.location.hash.replace(/^.*?#/,'')

  // url submission
  $('#url-form').submit(function(e) {
    var urlVal = $('#url').val()
    var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    if (regex.test(urlVal)) {
      return
    } else {
      var newURL = 'http://' + urlVal
      $('#url').val(newURL)
      return
    }

  })

  $(w).resize(function(){
    sw = document.body.clientWidth
    if (fullMode == true) {
      sizeFull()
    }
  })

  function changeActiveState(link) {
    var $activeLink = link
    $('.sg-size-options a').removeClass('active')

    if (link) {
      $activeLink.addClass('active')
    }
  }

  $('.sg-acc-handle').on("click", function(e){
    var $this  = $(this)
      , $panel = $this.next('.sg-acc-panel')
    e.preventDefault()
    $this.toggleClass('active')
    $panel.toggleClass('active')
  })

  $('#sg-size-toggle').on("click", function(e){
    e.preventDefault()
    $(this).parents('ul').toggleClass('active')
  })

  $('#sg-size-s').on("click", function(e){
    e.preventDefault()
    killDisco()
    killHay()
    fullMode = false
    setHash('s')
    changeActiveState($(this))
    sizeSmall()
  })

  $('#sg-size-m').on("click", function(e){
    e.preventDefault()
    killDisco()
    killHay()
    fullMode = false
    setHash('m')
    changeActiveState($(this))
    sizeMedium()
  })

  $('#sg-size-l').on("click", function(e){
    e.preventDefault()
    killDisco()
    killHay()
    fullMode = false
    setHash('l')
    changeActiveState($(this))
    sizeLarge()
  })

  $('#sg-size-full').on("click", function(e){ // resets
    e.preventDefault()
    killDisco()
    killHay()
    changeActiveState($(this))
    fullMode = true
    setHash('')
    sizeiframe(sw)
  })

  $('#sg-size-random').on("click", function(e){
    e.preventDefault()
    fullMode = false
    sizeRandom()
    setHash('random')
  })

  function sizeSmall() {
    sizeiframe(getRandom(minVPWidth,500))
  }

  function sizeMedium() {
    sizeiframe(getRandom(500,800))
  }

  function sizeLarge() {
    sizeiframe(getRandom(800,1200))
  }

  function setHash(hash) {
    var baseUrl = window.location.href.split('#')[0]
    window.location.replace(baseUrl + '#' + hash)
  }

  function sizeRandom() {
    killDisco()
    killHay()
    fullMode = false
    changeActiveState($('#sg-size-random'))
    sizeiframe(getRandom(minVPWidth,sw))
  }

  function sizeFull() {
    sizeiframe(sw, false)
    updateSizeReading(sw)
  }

  $('#sg-size-disco').on("click", function(e){
    e.preventDefault()
    killHay()
    fullMode = false

    if (discoMode) {
      killDisco()
      changeActiveState()
      setHash('')
    } else {
      startDisco()
      changeActiveState($(this))
      setHash('disco')
    }
  })

  function disco() {
    sizeiframe(getRandom(minVPWidth,sw))
  }

  function killDisco() {
    discoMode = false
    clearInterval(discoID)
    discoID = false
  }

  function startDisco() {
    discoMode = true
    discoID = setInterval(disco, 800)
  }

  $('#sg-size-hay').on("click", function(e){
    e.preventDefault()
    killDisco()

    if (hayMode) {
      killHay()
      changeActiveState()
      setHash('')
    } else {
      startHay()
      changeActiveState($(this))
      setHash('hay')
    }
  })

  function killHay() {
    var currentWidth = $sgViewport.width()
    hayMode = false
    $sgViewport.removeClass('hay-mode')
    $sgWrapper.removeClass('hay-mode')
    sizeiframe(Math.floor(currentWidth))
  }

  function startHay() {
    hayMode = true
    $sgWrapper.removeClass("vp-animate").width(minVPWidth+vpResizerWidth)
    $sgViewport.removeClass("vp-animate").width(minVPWidth)

    window.setTimeout(function(){
      $sgWrapper.addClass('hay-mode').width(maxVPWidth+vpResizerWidth)
      $sgViewport.addClass('hay-mode').width(maxVPWidth)

      setInterval(function(){
        var vpSize = $sgViewport.width()
        updateSizeReading(vpSize)
      },100)
    }, 200)
  }

  $sizePx.on('keydown', function(e){
    var val = Math.floor($(this).val())

    if (e.keyCode === 38) { // up
      val++
      sizeiframe(val,false)
      setHash(val)
    } else if (e.keyCode === 40) { // down
      val--
      sizeiframe(val,false)
      setHash(val)
    } else if (e.keyCode === 13) { // enter
      e.preventDefault()
      sizeiframe(val)
      setHash(val)
      $(this).blur()
    }
    changeActiveState()
  })

  $sizePx.on('keyup', function(){
    var val = Math.floor($(this).val())
    updateSizeReading(val,'px','updateEmInput')
  })

  $sizeEms.on('keydown', function(e){
    var val = parseFloat($(this).val())

    if (e.keyCode === 38) {
      val++
      sizeiframe(Math.floor(val * $bodySize),false)
    } else if (e.keyCode === 40) {
      val--
      sizeiframe(Math.floor(val * $bodySize),false)
    } else if (e.keyCode === 13) {
      e.preventDefault()
      sizeiframe(Math.floor(val * $bodySize))
    }
    changeActiveState()

    setHash(parseInt(val * $bodySize))
  })

  $sizeEms.on('keyup', function(){
    var val = parseFloat($(this).val())
    updateSizeReading(val,'em','updatePxInput')
  })

  $('#sg-mq a').on("click", function(e){
    e.preventDefault()
    var val = $(this).html()
    var type = (val.indexOf('px') !== -1) ? 'px' : 'em'
    val = val.replace(type,"")
    var width = (type === 'px') ? val * 1 : val * $bodySize
    sizeiframe(width,true)
  })

  // 'size' is the target size of the viewport
  // 'animate' is a boolean for switching the CSS animation on or off.
  // 'animate' is true by default, but can be set to false for things like nudging and dragging
  function sizeiframe(size,animate) {
    var theSize

    if (size > maxVPWidth) {      // if entered size is larger than max allowed, cap val
      theSize = maxVPWidth
    } else if (size<minVPWidth) { // if it's less than min, cap
      theSize = minVPWidth
    } else {
      theSize = size
    }

    // conditionally remove CSS animation class from viewport
    if (animate === false) {
      $sgWrapper.removeClass("vp-animate")
      $sgViewport.removeClass("vp-animate")
    } else {
      $sgWrapper.addClass("vp-animate")
      $sgViewport.addClass("vp-animate")
    }

    $sgWrapper.width(theSize + vpResizerWidth) // resize wrapper to size + resize handle
    $sgViewport.width(theSize)                 // resize viewport
    updateSizeReading(theSize)                 // update vals in toolbar
  }


  // 'size' is the input number
  // 'unit' is the type of unit: either px or em. Default is px. Accepted values are 'px' and 'em'
  // 'target' is what inputs to update. Defaults to both
  function updateSizeReading(size,unit,target) {
    if (unit=='em') {
      emSize = size
      pxSize = Math.floor(size * $bodySize)
    } else {
      pxSize = size
      emSize = size / $bodySize
    }

    if (target == 'updatePxInput') {
      $sizePx.val(pxSize)
    } else if (target == 'updateEmInput') {
      $sizeEms.val(emSize.toFixed(2))
    } else {
      $sizeEms.val(emSize.toFixed(2))
      $sizePx.val(pxSize)
    }
  }

  function getRandom (min, max) {
    var num = Math.random() * (max - min) + min
    return parseInt(num)
  }

  function updateViewportWidth(size) {
    $sgViewport.width(size)
    $sgWrapper.width(size * 1 + 14)
    updateSizeReading(size)
  }

  // handles widening the "viewport"
  //   1. on "mousedown" store the click location
  //   2. make a hidden div visible so that it can track mouse movements and make sure the pointer doesn't get lost in the iframe
  //   3. on "mousemove" calculate the math, save the results to a cookie, and update the viewport
  $('#sg-rightpull').mousedown(function(event) {
    var origClientX = event.clientX // capture default data
    var origViewportWidth = $sgViewport.width()
    fullMode = false

    $("#sg-cover").css("display","block") // show the cover

    // add the mouse move event and capture data. also update the viewport width
    $('#sg-cover').mousemove(function(event) {

      viewportWidth     = (origClientX > event.clientX)     ?
      origViewportWidth - ((origClientX - event.clientX)*2) :
      origViewportWidth + ((event.clientX - origClientX)*2)

      if (viewportWidth > minVPWidth) {
        setHash(viewportWidth)
        sizeiframe(viewportWidth, false)
      }
    })
  })

  // on "mouseup" we unbind the "mousemove" event and hide the cover again
  $('body').mouseup(function(event) {
    $('#sg-cover').unbind('mousemove')
    $('#sg-cover').css("display","none")
  })

  // capture the viewport width that was loaded and modify it so it fits with the pull bar
  var origViewportWidth = $sgViewport.width()
  $sgWrapper.width(origViewportWidth)
  $sgViewport.width(origViewportWidth - 14)
  updateSizeReading($sgViewport.width())

  if (hash === 'hay') {
    startHay()
  } else if (hash === 'disco') {
    startDisco()
  } else if (hash === 'random') {
    sizeRandom()
  } else if (hash === 'l') {
    sizeLarge()
  } else if (hash === 'm') {
    sizeMedium()
  } else if (hash === 's') {
    sizeSmall()
  } else if (!isNaN(hash) && hash !== '') {
    sizeiframe(parseInt(hash))
    console.log('this is a number')
  } else {
    sizeFull()
    console.log('this is not a number')
  }

})(this)

