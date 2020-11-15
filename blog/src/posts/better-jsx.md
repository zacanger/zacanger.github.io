---
title: ideas for a better jsx
created: 2016-05-05
tags:
  - jsx
  - react
  - js
---

please note: these aren't all my ideas, some are from [ryan
walsh](http://ryanwalsh.io)

also, all of this was from back when both myself and ryan were just starting to
learn react

i don't dislike jsx, i got over that

pretty sure ryan did, too

```jsx
// JSX
export default class ProfileInfo extends React.Component {
  render() {
    return (
      <div className="profile-info-container">

        <div className="profile-image-wrapper">
          <img className="profile-image" src="https://avatars1.githubusercontent.com/u/12636781?v=3&s=460" />
        </div>

        <div className="name-info-container">
          <h2 className="display-name">Ryan Walsh</h2>
          <h3 className="username">r-walsh</h3>
        </div>

        <table className="profile-guide-info">
          <tr className="number-container">
            <th className="guide-info-number">
              <span className="profile-authored"><a href="/profile">12</a></span>
            </th>
            <th className="guide-info-number">
              <span className="profile-favorites"><a href="/profile">20</a></span>
            </th>
            <th className="guide-info-number">
              <span className="profile-followers"><a href="/profile">47</a></span>
            </th>
          </tr>

          <tr>
            <td>
              <span className="profile-authored"><a href="/profile"><i className="fa fa-pencil"></i></a></span>
            </td>
            <td>
              <span className="profile-favorites"><a href="/profile"><i className="fa fa-heart"></i></a></span>
            </td>
            <td>
              <span className="profile-followers"><a href="/profile"><i className="fa fa-eye"></i></a></span>
            </td>
          </tr>
        </table>

      </div>
    )
  }
}

// Other nonsense
export default class ProfileInfo extends React.Component {
  render() {
    return (
      div( { class: ['profile-guide-info-container'] } ) {

        div( { class: ["profile-image-wrapper"] } ) {
          img( { class: ['profile-image'], src: 'https://avatars1.githubusercontent.com/u/12636781?v=3&s=460' } ) {}
        }

        div( { class: 'name-info-container' } ) {
          h2( { class: "display-name" } ) { John Doe }
          h3( { class: 'username' } ) { jdoe }
        }

        table( { class: ['profile-guide-info'] } ) {
          tr( { class: ['number-container'] } ) {
            th( { class: ['guide-info-number'] } ) {
              span( { class: ['profile-authored'] } )
            }

            th( { class: ['guide-info-number'] } ) {
              span( { class: ['profile-authored'] } )
            }

            th( { class: ['guide-info-number'] } ) {
              span( { class: ['profile-authored'] } )
            }
          }

          tr() {
            td() {
              span( { class: ['profile-authored'] } ) {}
            }

            td() {
              span( { class: ['profile-authored'] } ) {}
            }

            td() {
              span( { class: ['profile-authored'] } ) {}
            }
          }
        }
      }
    )
  }
}

// why not like this?
export default class ProfileInfo extends React.Component{
  render() {
    return ({
      div : {
        class : ['foo', 'bar']
      , p : {
          str : 'Bespoke scenester retro bitters Pitchfork 8-bit mixtape PBR&B mlkshk iphone wire-rimmed glasses forage Helvetica put a bird on it intelligentsia semiotics leggings normcore. Flexitarian Echo Park mustache carles kickstarter Echo Park Blue Bottle actually tumblr beard literally tote bag Pitchfork cray shabby Portland stumptown asymmetrical.'
        }
      }
    , footer : {
        span : {
          str : `Copyright ${datespan} ${company}. All Rights Reserved.`
}}})}

// or this?
const n = notJSX
function notJSXparser(){
  return n('body', [
    n('h1', {'this is a website'},
      n('p', {'this is a lot of text! texytext, text. texting. txet.'},
        n('footer', {`Copyright ${stuff}`})
      )
    )
  ])
}

// how they do it in EVE's UI (note: they use typescript and an in-house custom lib they call 'microReact')
const page = {
  t          : 'span' // the tag type; defauts to 'div'
, c          : 'col-12' // className
, text       : 'some content'
, children   : [{
    // array of further nodes
  }]
, top        : 10
, width      : 100 // more styles can go here, like react's style object basically
, click      : someHandler
, svg        : true // to add svg properties... why? idk. just 'cuz, i guess.
, cx         : 4
, cy         : 4
, postRender : someDomManipulationFunction // on insertion and on update
}

// how jsx actually kinda works (reactelement anyway) under the hood:
let someEl = {
  type  : 'div'
, props : {}
, ref   : null
, key   : null
}
```
