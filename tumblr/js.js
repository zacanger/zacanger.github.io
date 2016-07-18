// tumblr feed widget
// usage: in your html somewhere, have an id on an element that matches the id specified
// in the settings (immediately below here).
// change the settings to match what you're looking for.
// style it all. i recommend setting min-heights to at least height of the 'imageSize' (below).
// forked from https://github.com/robnyman/tumblrbadge

var tumblrBadge = function () {
  var settings = {                     // modify all this to suit yourself
    userName         : 'zacanger'      // username
  , itemsToShow      : 8               // number of posts
  , itemToAddBadgeTo : 'tumblr-widget' // id of element to use
  , imageSize        : 250             // 75, 100, 250, 400, or 500
  , shortPublishDate : true            // cuts date
  , timeToWait       : 5000            // milliseconds
  }

  // badge functionality
  var head           = document.getElementsByTagName('head')[0]
    , badgeContainer = document.getElementById(settings.itemToAddBadgeTo)

  if (head && badgeContainer) {
    var badgeJSON  = document.createElement('script')
    badgeJSON.type = 'text/javascript'
    badgeJSON.src  = 'http://' + settings.userName + '.tumblr.com/api/read/json?callback=tumblrBadge.listItems&num=' + settings.itemsToShow
    head.appendChild(badgeJSON)

    var wait = setTimeout(function () {
      badgeJSON.onload = null
      badgeJSON.parentNode.removeChild(badgeJSON)
      badgeJSON = null
    }, settings.timeToWait)

    listItems = function (json) {
      var
        posts = json.posts
      , list  = document.createElement('ul')
      , post, listItem, text, link, img, conversation, postLink

      list.className = 'tumblr'

      for (var i = 0, il = posts.length; i < il; i = i + 1) {
        post = posts[i] // choose content types to get

        if (/regular|photo|quote|link|conversation/.test(post.type)) {
          listItem = document.createElement('li')
          text = post['regular-body'] || post['photo-caption'] || post['quote-source'] || post['link-text'] || post['link-url'] || ''

          if (post.type === 'photo') {
            link      = document.createElement('a')
            link.href = post.url
            img       = document.createElement('img')
            img.width = settings.imageSize // avoid a creeping page
            img.src   = post['photo-url-' + settings.imageSize]
            link.appendChild(img)
            listItem.appendChild(link)
            text = '<em>' + text + '</em>'
          } else if (post.type === 'quote') {
            text = post['quote-text'] + '<em>' + text + '</em>'
          } else if (post.type === 'link') {
            text = '<a href="' + post["link-url"] + '">' + text + '</a>'
          } else if (post.type === 'conversation') {
            conversation = post['conversation-lines']
            for (var j = 0, jl = conversation.length; j < jl; j = j + 1) {
              text += conversation[j].label + ' ' + conversation[j].phrase + ((j === (jl -1))? '' : '<br>')
            }
          }

          listItem.innerHTML += text
          postLink            = document.createElement('a') // link to the post
          postLink.className  = 'tumblr-post-date'
          postLink.href       = post.url
          postLink.innerHTML  = (settings.shortPublishDate) ? // short date
            post['date'].replace(/(^\w{3},\s)|(:\d{2}$)/g, "") :
            post['date']
          listItem.appendChild(postLink)
          list.appendChild(listItem) // put li in ul
        }
      }

      badgeContainer.innerHTML = '' // put ul in target element
      badgeContainer.appendChild(list)
    }

    return {
      listItems : listItems
    }
  }
}()
