const React = require('react')

const App = React.createClass({
  getInitialState () {
    return {
      commands : {}
    , history  : []
    , prompt   : '$ '
    }
  }

, clearHistory () { this.setState({history : []}) }

, registerCommands () {
    this.setState({
      commands : {
        'clear'  : this.clearHistory
      , 'ls'     : this.listFiles
      , 'intro'  : this.showWelcomeMsg
      , 'help'   : this.showHelp
      , 'cat'    : this.catFile
      , 'source' : this.openLink('https://github.com/prakhar1989/react-term/')
      , 'github' : this.openLink('http://github.com/zacanger')
      , 'blog'   : this.openLink('http://blog.zacanger.com')
      , 'resume' : this.openLink('http://zacanger.com/zacanger.json')
      , 'exit'   : this.goHome
      }
    })
  }

, goHome () { window.location.href = 'http://zacanger.com' }

, listFiles () {
    this.addHistory('README.md')
    this.addHistory('zacanger.json')
  }

, showWelcomeMsg () {
    this.addHistory('Zac Anger, developer and musician.')
    this.addHistory('type `help` to see available commands')
  }

, catFile (arg) {
    if (arg === 'README.md') {
      this.addHistory(' ')
      this.addHistory('# ZAC ANGER')
      this.addHistory('JS Dev, nix hacker, musician')
      this.addHistory('Type `help` to see available commands')
      this.addHistory(' ')
    } else if (arg === 'zacanger.json') {
      this.addHistory(`
{
  "name": "Zac Anger",
  "status": "Happy employed.",
  "website": "http://zacanger.com",
  "avatar": "http://zacanger.com/logo.svg",
  "writing": "http://blog.zacanger.com",
  "links": [
    "http://pinboard.in/u:zacanger",
    "http://linkedin.com/in/zacanger",
    "http://twitter.com/zacanger",
    "http://zacanger.tumblr.com",
    "http://github.com/zacanger",
    "http://soundcloud.com/zacanger",
    "http://zacanger.bandcamp.com",
    "http://zacanger.deviantart.com",
    "http://zacanger.pen.io",
    "http://facebook.com/zacangermusic",
    "https://plus.google.com/+zacangermusic/"
  ],
  "languages and technologies": [
    "javascript",
    "react",
    "(neo)vim",
    "bash/sh",
    "debian administration",
    "css/stylus/sass/less",
    "node",
    "angular (1.x)",
    "vue"
    "ruby",
    "python",
    "haskell",
    "soft skills"
  ]
}

`)
    } else {
      this.addHistory('cat: ' + arg + ': No such file or directory')
    }
  }

, openLink (link) {
    return function () {
      window.open(link, '_blank')
    }
  }

, showHelp () {
    this.addHistory(' ')
    this.addHistory('help - this help text')
    this.addHistory('github - go to my github')
    this.addHistory('source - check out the original version of this page')
    this.addHistory('intro - print intro message')
    this.addHistory('blog - check mine out')
    this.addHistory('clear - clear screen')
    this.addHistory('cat - print contents of a file')
    this.addHistory('ls - list files')
    this.addHistory('resume - view my cv (in json)')
    this.addHistory('exit')
    this.addHistory(' ')
  }

, componentDidMount () {
    var term = this.refs.term.getDOMNode()

    this.registerCommands()
    this.showWelcomeMsg()
    term.focus()
  }

, componentDidUpdate () {
    var el = React.findDOMNode(this)
    var container = document.getElementById('main')
    container.scrollTop = el.scrollHeight
  }

, handleInput (e) {
    if (e.key === 'Enter') {
      var input_text = this.refs.term.getDOMNode().value
      var input_array = input_text.split(' ')
      var input = input_array[0]
      var arg = input_array[1]
      var command = this.state.commands[input]

      this.addHistory(this.state.prompt + ' ' + input_text)

      if (command === undefined) {
        this.addHistory('sh: command not found: ' + input)
      } else {
        command(arg)
      }
      this.clearInput()
    }
  }

, clearInput () { this.refs.term.getDOMNode().value = '' }

, addHistory (output) {
    var history = this.state.history
    history.push(output)
    this.setState({'history' : history})
  }

, handleClick () {
    var term = this.refs.term.getDOMNode()
    term.focus()
  }

, render () {
    var output = this.state.history.map((op, i) => <p key={i}>{op}</p>)

    return (
      <div className="input-area" onClick={this.handleClick}>
        {output}
        <p>
          <span className="prompt">{this.state.prompt}</span>
          <input type="text" onKeyPress={this.handleInput} ref="term" />
        </p>
      </div>
    )
  }
})

const AppComponent = React.createFactory(App)
React.render(AppComponent(), document.getElementById('app'))

