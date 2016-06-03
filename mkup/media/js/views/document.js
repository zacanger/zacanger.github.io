// this is the main document view (the "viewport" or "canvas" where the actual content is created)

usemockups.views.Page = Backbone.View.extend({
  'el': 'article',

  mockup_count: 0,

  initialize: function () {
    this.model.mockups.on('add', this.add_mockup, this)
    this.model.mockups.on('reset', this.render_mockups, this)
    this.model.on('change:width change:height', this.resize_document, this)
    this.render_mockups()
    this.footer = $('footer')
  },

  add_mockup: function (mockup, options) {
    var mockup_view = new (this.get_mockup_view(mockup.get('tool')))({
      model: mockup
    })
    this.$el.append(mockup_view.render(options).el)

    if (mockup.is_resizable())
      mockup_view.make_resizable()

    mockup_view.$el.attr('tabindex', this.mockup_count++)

    mockup_view.focus()

    return this
  },

  render_mockups: function () {
    this.$el.empty()
    _.forEach(this.model.mockups.models, function (model) {
      this.add_mockup(model, {
        focus: false,
        show_property_dialog: false
      })
    }, this)
    this.model.mockups.off('reset')
  },

  resize_document: function () {
    this.$el
      .width(this.model.get('width'))
      .height(this.model.get('height'))
  },

  render: function () {
    this.resize_document()

    this.$el.droppable({
      accept: '.toolbox li',
      drop: function (event, ui) {
        var left = ui.offset.left - this.$el.offset().left,
          top = ui.offset.top - this.$el.offset().top,
          tool_name = ui.draggable.data('tool')

        var mockup = new usemockups.models.Mockup({
          top: top,
          left: left,
          tool: tool_name
        })

        this.model.mockups.add(mockup)
      }.bind(this)
    })

    this.$el.click(function (event) {
      if ($(event.target).is('article')) {
        this.footer.hide()
      }
    }.bind(this))
  },

  get_mockup_view: function (tool_name) {
    return usemockups.custom_mockup_views[tool_name] ||
    usemockups.views.Mockup
  }
})

// this is the main view of the app (with toolbars, the document itself ("page") etc.)
usemockups.views.Document = Backbone.View.extend({
  el: 'body',

  events: {
    'click header': 'change_title',
    'click .export-image': 'export_image'
  },

  initialize: function () {
    this.model.on('change:title', this.render_title, this)
  },

  render: function () {
    (new usemockups.views.Toolbox({
      model: usemockups.toolbox
    })).render()

    this.article = (new usemockups.views.Page({
      model: this.model
    }))
    this.article.render()

    this.edit_form = new usemockups.views.DocumentEditForm({
      model: this.model
    })
    this.edit_form.render()

    this.import_export_form = new usemockups.views.DocumentImportExportForm({
      model: this.model
    })
    this.import_export_form.render()

    this.render_title()
  },

  render_title: function () {
    this.$el.find('header h1').html(this.model.escape('title'))
    return this
  },

  change_title: function () {
    var title = window.prompt('Title', this.model.get('title'))
    if (title) {
      this.model.save({
        title: title
      })
    }
  },

  export_image: function () {
    html2canvas([this.article.el], {
      onrendered: function (canvas) {
        window.open(canvas.toDataURL('image/png'))
      }
    })
  }
})

// this is the view of items of documents (select and destroy functions)
usemockups.views.NavigationItem = Backbone.View.extend({
  tagName: 'li',
  template: $('#navigation-item-template').html(),
  events: {
    'click a.show': 'navigate',
    'click a.destroy': 'destroy'
  },
  render: function () {
    this.$el.html(_.template(this.template, this.model.toJSON()))
    return this
  },
  navigate: function () {
    this.options.router.navigate_document(this.model)
  },
  destroy: function () {
    if (!window.confirm('Are you sure?'))
      return false

    this.model.destroy()
    this.$el.remove()
    return false
  }
})

// this is the view of a form to create a new document
usemockups.views.NewDocumentForm = Backbone.View.extend({
  el: 'nav #documents form',
  events: {
    'submit': 'submit_form'
  },
  submit_form: function () {
    var title = this.$el.find('#id_title')
    if (title) {
      (new usemockups.models.Document()).save({ title: title.val() }, {
        success: function (model) {
          this.model.add(model)
          title.val('')
        }.bind(this)
      })
    }
    return false
  }
})

// view for setting document properties
usemockups.views.DocumentEditForm = Backbone.View.extend({
  el: 'nav #document-properties form',
  events: {
    'submit': 'submit_form'
  },
  render: function () {
    this.$el.find('#id_title').val(this.model.get('title'))
    this.$el.find('#id_width').val(this.model.get('width'))
    this.$el.find('#id_height').val(this.model.get('height'))
  },
  submit_form: function () {
    this.model.set({
      'title': this.$el.find('#id_title').val(),
      'width': this.$el.find('#id_width').val(),
      'height': this.$el.find('#id_height').val()
    })
    this.model.save()
    this.hide()
    return false
  },
  hide: function () {
    this.$el.parent().hide()
  }
})

// http://stackoverflow.com/questions/13294216/exporting-backbone-js-collection-to-plain-text-on-hard-disk-importing-back
usemockups.views.DocumentImportExportForm = Backbone.View.extend({
  el: 'nav #document-import-export form',
  events: {
    'submit': 'submit_form'
  },

  initialize: function () {
    this.model.on('change', this.render, this)
  },

  render: function () {
    // makes sure previous content is voided
    this.$el.find('#id_models').val('')
    if (typeof this.model.mockups !== 'undefined' && this.model.mockups.length > 0) {
      this.$el.find('#id_models').val(JSON.stringify(this.model.mockups, null, 2))
    }
  },

  submit_form: function () {
    var mockups = JSON.parse(this.$el.find('#id_models').val())
    this.model.mockups.add(mockups)
    this.model.save()
    this.hide()
    return false
  },

  hide: function () {
    this.$el.parent().hide()
  }
})

usemockups.views.Navigation = Backbone.View.extend({
  el: 'nav',
  events: {
    'click a.documents': 'toggle_documents',
    'click a.properties': 'toggle_document_properties',
    'click a.import-export': 'toggle_import_export'
  },
  initialize: function () {
    this.model.on('reset', this.render, this)
    this.model.on('add', this.add_document_item, this)
    this.model.fetch()
  },
  add_document_item: function (model) {
    this.$el.find('ul').append((new usemockups.views.NavigationItem({
      model: model,
      router: this.options.router,
      parent: this
    })).render().el)
  },
  render: function () {
    _.forEach(this.model.models, this.add_document_item, this)

    new usemockups.views.NewDocumentForm({
      model: this.model
    }).render()
  },
  toggle_documents: function () {
    this.$el.find('#document-properties').hide()
    this.$el.find('#document-import-export').hide()
    this.$el.find('#documents').toggle()
    return false
  },
  toggle_document_properties: function () {
    this.$el.find('#documents').hide()
    this.$el.find('#document-import-export').hide()
    this.$el.find('#document-properties').toggle()
    return false
  },
  toggle_import_export: function () {
    this.$el.find('#documents').hide()
    this.$el.find('#document-properties').hide()
    this.$el.find('#document-import-export').toggle()
    return false
  }
})
