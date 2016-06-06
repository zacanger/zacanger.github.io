const
  React = require('react')
, App   = React.createClass({

  getInitialState () {
    return {
      commands : {}
    , history  : []
    , prompt   : '[zac@ngr:~] $ '
    }
  }

, clearHistory () { this.setState({history : []}) }

, registerCommands () {
    this.setState({
      commands : {
        'clear'   : this.clearHistory
      , 'c'       : this.clearHistory
      , 'ls'      : this.listFiles
      , 'l'       : this.listFiles
      , 'k'       : this.listFiles
      , 'help'    : this.showHelp
      , 'info'    : this.showHelp
      , 'man'     : this.showHelp
      , 'h'       : this.showHelp
      , 'cat'     : this.catFile
      , 'mf'      : this.openLink('http://zacanger.com/mf')
      , 'twitter' : this.openLink('http://twitter.com/zacanger')
      , 't'       : this.openLink('http://twitter.com/zacanger')
      , 'mkup'    : this.openLink('http://zacanger.com/mkup')
      , 'paste'   : this.openLink('http://zacanger.com/p')
      , 'p'       : this.openLink('http://zacanger.com/p')
      , 'doc'     : this.openLink('http://mdkb.zacanger.com')
      , 'mdkb'    : this.openLink('http://mdkb.zacanger.com')
      , 'search'  : this.openLink('http://zacanger.com/search')
      , 'github'  : this.openLink('http://github.com/zacanger')
      , 'gh'      : this.openLink('http://github.com/zacanger')
      , 'blog'    : this.openLink('http://blog.zacanger.com')
      , 'b'       : this.openLink('http://blog.zacanger.com')
      , 'light'   : this.openLink('http://zacanger.com/light')
      , 'lite'    : this.openLink('http://zacanger.com/light')
      , 'cv'      : this.openLink('http://zacanger.com/zacanger.json')
      , 'resume'  : this.openLink('http://zacanger.com/zacanger.json')
      , 'exit'    : this.exit
      , 'q'       : this.exit
      }
    })
  }

, exit () {
    this.addHistory('bye!')
    setTimeout(() => window.location.href = 'http://zacanger.com', 1000)
  }

, listFiles () {
    this.addHistory('README.md')
    this.addHistory('about.md')
    this.addHistory('zacanger.json')
  }

, showWelcomeMsg () {
    this.addHistory(`Last login : ${new Date()} on tty1`)
    this.addHistory('Welcome!')
  }

, catFile (arg) {
    if (arg.toLowerCase() ===  'readme.md') {
      this.addHistory('# ZAC ANGER')
      this.addHistory('developer & musician')
      this.addHistory('JS developer, web technology enthusiast,')
      this.addHistory('Linux (Debian Sid) user.')
      this.addHistory('Node fan, functional programming believer,')
      this.addHistory('internet addict, (neo)vim user.')
      this.addHistory('Musician; multi-instrumentalist, recording')
      this.addHistory('engineer, amateur composer, beat-mangler.')
      this.addHistory('Type `help` to see available commands')
    } else if (arg.toLowerCase() === 'about.md') {
      this.addHistory('This page is written in React.')
      this.addHistory('The original version is located')
      this.addHistory('here: https://github.com/prakhar1989/react-term')
    } else if (arg.toLowerCase() === 'zacanger.json') {
      this.addHistory('{')
      this.addHistory('"name": "Zac Anger",')
      this.addHistory('"links": [')
      this.addHistory('"http://zacanger.com",')
      this.addHistory('"http://blog.zacanger.com",')
      this.addHistory('"http://pinboard.in/u:zacanger",')
      this.addHistory('"http://linkedin.com/in/zacanger",')
      this.addHistory('"http://twitter.com/zacanger",')
      this.addHistory('"http://zacanger.tumblr.com",')
      this.addHistory('"http://github.com/zacanger",')
      this.addHistory('"http://soundcloud.com/zacanger",')
      this.addHistory('"http://zacanger.bandcamp.com",')
      this.addHistory('"http://zacanger.deviantart.com",')
      this.addHistory('],')
      this.addHistory('"languages and technologies": [')
      this.addHistory('"javascript", "react", "vim", "bash/sh",')
      this.addHistory('"linux", "css/stylus/sass/less", "node"')
      this.addHistory('],')
      this.addHistory('"note": "to see more, please type `cv`"')
      this.addHistory('}')
    } else {
      this.addHistory(`cat : ${arg}: No such file or directory`)
    }
  }

, openLink (link) {
    return () => window.open(link, '_blank')
  }

, showHelp () {
    this.addHistory('help - this help text')
    this.addHistory('github - go to my github')
    this.addHistory('blog - check mine out')
    this.addHistory('twitter - go to my twitter')
    this.addHistory('clear - clear screen')
    this.addHistory('cat - print contents of a file')
    this.addHistory('ls - list files')
    this.addHistory('mf - open mobile-friendly tester')
    this.addHistory('doc - docs site')
    this.addHistory('paste - go to my little pastebin')
    this.addHistory('mkup - open mockup tool')
    this.addHistory('search - search the web')
    this.addHistory('light - open a flashlight')
    this.addHistory('cv - view my cv (in json)')
    this.addHistory('exit - close this session')
  }

, componentDidMount () {
    const term = this.refs.term.getDOMNode()
    this.registerCommands()
    this.showWelcomeMsg()
    term.focus()
  }

, componentDidUpdate () {
    const el = React.findDOMNode(this)
    let container = document.getElementById('main')
    container.scrollTop = el.scrollHeight
  }

, handleInput (e) {
    if (e.key === 'Enter') {
      const
        input_text = this.refs.term.getDOMNode().value
      , input_array = input_text.toLowerCase().split(' ')
      , input = input_array[0]
      , arg = input_array[1]
      , command = this.state.commands[input]

      this.addHistory(this.state.prompt + ' ' + input_text)

      if (command === undefined) {
        this.addHistory(`sh: command not found: ${input}`)
        this.addHistory('type `help` to see available commands')
      } else {
        command(arg)
      }
      this.clearInput()
    }
  }

, clearInput () { this.refs.term.getDOMNode().value = '' }

, addHistory (output) {
    const history = this.state.history
    history.push(output)
    this.setState({'history' : history})
  }

, handleClick () {
    const term = this.refs.term.getDOMNode()
    term.focus()
  }

, render () {
    const output = this.state.history.map((op, i) => <p key={i}>{op}</p>)

    return (
      <div className="input-area" onClick={this.handleClick}>
        {output}
        <p>
          <span className="prompt">{this.state.prompt}</span>
          <input
            autofocus
            type="text"
            spellCheck="false"
            onKeyPress={this.handleInput}
            ref="term"
          />
        </p>
      </div>
    )
  }
})

const AppComponent = React.createFactory(App)
React.render(AppComponent(), document.getElementById('app'))

