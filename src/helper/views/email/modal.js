// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

/**
 * @module common/js/views/modal
 */
define(function(require) {
    "use strict";

    var $ = require("jquery");

    var BaseView = require("common/js/views/layout");

    var template = require("common/templates/modal.html");

    var Modal = BaseView.extend(/** @lends module:common/js/views/modal~Modal.prototype */{
        events: {
            "click .modal-close-button": "close"
        },
        target: "body",
        template: template,
        title: "Modal",
        /**
         * @class
         * @constructs module:common/js/app/views/modal~Modal
         *
         * Initialize the modal.
         * @param {Object} options The options for the modal.
         * @param {string} options.title The title for the modal.
         * @param {string} options.target The CSS selector for the parent of the modal.
         * @param {clean} options.clean No header & footer, just body
         * @param {Backbone.View} options.body The Backbone View that makes up the modal's body.
         */
        initialize: function(options) {
            this.body = options.body;
            this.title = options.title || this.title;
            this.target = options.target || this.target;
            this.clean = options.clean || false;
            $(this.target).append(this.$el);
            this.listenTo(this.body, "close", this.close.bind(this));
        },
        /**
         * Render the modal to the screen
         */
        render: function() {
            this.$el.html(template, this);
            this.$(".modal-body").append(this.body.$el);
            this.body.render();
            const headerEl = $(".modal-header");
            if (this.clean) {
              headerEl.remove();
              $(".modal-footer").remove();
            }
            if (!this.clean) {
              headerEl.text(this.title);
            }
        },
        /**
         * Close the modal and remove it from the DOM.
         */
        close: function() {
            this.remove();
            this.trigger("close");
        },
        /**
         * Remove the modal from the DOM.
         */
        remove: function() {
            if (this.body !== undefined) {
                this.body.remove();
            }
            BaseView.prototype.remove.call(this);
        }
    });

    return Modal;
});
