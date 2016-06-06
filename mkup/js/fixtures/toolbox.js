usemockups.fixtures.toolbox = [
  {
    'name': 'button',
    'category': 'form',
    'template': '#button-template',
    'attributes': [
      {
        'name': 'text',
        'default': 'Button'
      },
      {
        'name': 'width',
        'default': 80
      }
    ]
  },
  {
    'name': 'checkbox',
    'category': 'form',
    'template': '#checkbox-template',
    'attributes': [
      {
        'name': 'checked',
        'type': 'boolean',
        'default': true
      },
      {
        'name': 'text',
        'type': 'string',
        'default': 'Label'
      }
    ]
  },
  {
    'name': 'combobox',
    'category': 'form',
    'template': '#combobox-template',
    'attributes': [
      {
        'name': 'text',
        'default': 'Combobox'
      },
      {
        'name': 'width',
        'default': 120
      }
    ]
  },
  {
    'name': 'hscrollbar',
    'category': 'form',
    'template': '#hscrollbar-template',
    'attributes': [
      {
        'name': 'value',
        'default': 30 /* percentage */
      },
      {
        'name': 'width',
        'default': 120
      }
    ]
  },
  {
    'name': 'progressbar',
    'category': 'form',
    'template': '#progressbar-template',
    'attributes': [
      {
        'name': 'percent',
        'default': 30
      },
      {
        'name': 'width',
        'default': 120
      }
    ]
  },
  {
    'name': 'browser',
    'category': 'form',
    'template': '#browser-template',
    'attributes': [
      {
        'name': 'title',
        'default': 'Website'
      },
      {
        'name': 'url',
        'default': 'http://'
      },
      {
        'name': 'width',
        'default': 250
      },
      {
        'name': 'height',
        'default': 250
      }
    ]
  },
  {
    'name': 'groupbox',
    'category': 'form',
    'template': '#groupbox-template',
    'attributes': [
      {
        'name': 'title',
        'default': 'GroupBox'
      },
      {
        'name': 'width',
        'default': 250
      },
      {
        'name': 'height',
        'default': 250
      }
    ]
  },
  {
    'name': 'radio',
    'category': 'form',
    'template': '#radio-template',
    'attributes': [
      {
        'name': 'checked',
        'type': 'boolean',
        'default': true
      },
      {
        'name': 'text',
        'type': 'string',
        'default': 'Label'
      }
    ]
  },
  {
    'name': 'text',
    'category': 'form',
    'template': '#text-template',
    'min_height': 20,
    'attributes': [
      {
        'name': 'label',
        'type': 'boolean',
        'default': true
      },
      {
        'name': 'text',
        'type': 'string',
        'default': 'Label'
      },
      {
        'name': 'width',
        'default': 200
      },
      {
        'name': 'height',
        'default': 30
      }
    ]
  },
  {
    'name': 'heading',
    'category': 'typography',
    'template': '#heading-template',
    'attributes': [
      {
        'name': 'text',
        'default': 'Lorem ipsum dolor sit amet'
      },
      {
        'name': 'size',
        'default': '25'
      },
      {
        'name': 'color',
        'default': 'black'
      }
    ]
  },

  {
    'name': 'paragraph',
    'category': 'typography',
    'template': '#paragraph-template',
    'attributes': [
      {
        'name': 'text',
        'default': 'Lorem ipsum dolor sit amet'
      },
      {
        'name': 'width',
        'default': 300
      },
      {
        'name': 'background',
        'default': '#dedede'
      }
    ]
  },

  {
    'name': 'label',
    'category': 'typography',
    'template': '#label-template',
    'attributes': [
      {
        'name': 'text',
        'default': 'Label'
      },
      {
        'name': 'size',
        'default': 18
      },
      {
        'name': 'color',
        'default': '#383838'
      }
    ]
  },

  {
    'name': 'table',
    'category': 'content',
    'template': '#table-template',
    'attributes': [
      {
        'name': 'width',
        'default': 250
      },
      {
        'name': 'rows',
        'default': '3'
      },
      {
        'name': 'columns',
        'default': '3'
      },
      {
        'name': 'header',
        'default': true,
        'type': 'boolean'
      },
      {
        'name': 'values',
        'hidden': true,
        'default': [
          ['lorem', 'ipsum', 'dolor'],
          ['sit', 'amet', 'lorem'],
          ['ipsum', 'dolor', 'sit']
        ]
      }
    ]
  },

  {
    'name': 'image',
    'category': 'content',
    'template': '#image-template',
    'attributes': [
      {
        'name': 'width',
        'default': 250
      },
      {
        'name': 'height',
        'default': 250
      }
    ]
  },

  {
    'name': 'rectangle',
    'category': 'shapes',
    'template': '#shape-template',
    'min_height': 1,
    'min_width': 1,
    'attributes': [
      {
        'name': 'width',
        'default': 250
      },
      {
        'name': 'height',
        'default': 100
      },
      {
        'name': 'color',
        'default': '#dedede'
      },
      {
        'name': 'border',
        'default': true,
        'type': 'boolean'
      }
    ]
  },

  {
    'name': 'circle',
    'category': 'shapes',
    'template': '#shape-template',
    'attributes': [
      {
        'name': 'width',
        'default': 200
      },
      {
        'name': 'height',
        'default': 200
      },
      {
        'name': 'color',
        'default': '#dedede'
      },
      {
        'name': 'border',
        'default': true,
        'type': 'boolean'
      }
    ]
  }

]
