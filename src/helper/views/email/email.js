// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

define(function(require) {
    "use strict";

    var Mustache = require("mustache");

    var vslynxKey = require("@spectrio/vslynx-key");

    var BaseView = require("common/js/views/base");
    var mediaLibrary = require("common/js/app/media-library");
    var ProductCatalogUserEvent = require("product-catalog/js/models/user-event");

    var template = require("product-catalog/templates/email/email.html");

    var EmailPane = BaseView.extend({
        events: {
            "click .email-address-submit": "submitEmailAddress"
        },
        template: template,
        initialize: function() {
            this.keyboard = null;
            this.inputAdapter = null;

            this.listenTo(this.model, "invalid", this._renderError.bind(this));
        },
        render: function() {
            var topic = this.model.getTopic();

            if (topic !== undefined) {
                topic = topic.toJSON();
            } else {
                topic = {};
            }

            this.$el.html(Mustache.render(this.template, topic));
            this._buildKeyboard();
        },
        submitEmailAddress: function(evt) {
            var emailAddress = this.$("input").val();
            this.model.set("emailAddress", emailAddress);

            mediaLibrary.audio.playClickSound();
            if (this.model.isValid()) {
                this.$(".email-product-info-errors").text("");
                this.trigger("submitForm", this.model);
            }
        },
        updateUserEvent: function() {
        },
        _buildKeyboard: function() {
            var config = vslynxKey.Config.createEmailConfig();
            var keyboardTarget = this.$(".email-keyboard")[0];
            var input = this.$("input")[0];

            this._cleanUpKeyboard();

            this.keyboard = new vslynxKey.Keyboard({
                config: config,
                target: keyboardTarget
            });
            this.inputAdapter = new vslynxKey.InputAdapter({
                keyboard: this.keyboard,
                input: input
            });
            this.inputAdapter.open();
            this.inputAdapter.on("control", function() {
                mediaLibrary.audio.playClickSound();
            });
            this.inputAdapter.on("text", function() {
                mediaLibrary.audio.playClickSound();
            });
        },
        _cleanUpKeyboard: function() {
            if (this.keyboard !== null) {
                this.keyboard.close();
            }

            if (this.inputAdapter !== null) {
                this.inputAdapter.close();
            }
        },
        _renderError: function(model, error) {
            this.$(".email-product-info-errors").text(error);
        }
    });

    return EmailPane;
});