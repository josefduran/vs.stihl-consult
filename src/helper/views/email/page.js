// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

define(function(require) {
    "use strict";

    var vslynx = require("@spectrio/vs.vslynx-es6");

    var EmailMessage = require("product-catalog/js/models/email");
    var EmailPane = require("product-catalog/js/views/email/email");
    var ErrorMessage = require("product-catalog/js/views/email/error-message");
    var Modal = require("common/js/views/modal");
    var ProductCatalogPage = require("product-catalog/js/views/common/page");
    var util = require("common/js/util");

    // Templates
    var template = require("product-catalog/templates/email/page.html");

    var EmailPage = ProductCatalogPage.extend({
        pageName: "Email",
        template: template,
        initialize: function(options) {
            this.category = options.category;
            this.bdName = options.bdName;
            this.nav = this._buildNav();
            this.nav.setCurrent(".nav-mail");

            this.emailMessage = this._buildEmailMessage();

            this.emailPane = new EmailPane({
                model: this.emailMessage
            });
            this.listenTo(this.emailPane, "submitForm", this.submitMessage.bind(this));
            this.listenTo(this.emailPane, "userEvent", this.handleUserEvent.bind(this));

            this.children = {
                "#app-nav": this.nav,
                "#email-pane": this.emailPane
            };
        },
        emailProductInfo: function() {
            util.goBack();
        },
        handleUserEvent: function(userEvent) {
            this.trigger("userEvent", userEvent);
        },
        selectCategory: function(category) {
            this.model = category;
            this.productPane.updateCategory(category);
            this.trigger("navigate", "quick-pick/" + category.id, {"replace": true});
        },
        selectProduct: function(model) {
            this.trigger("navigate", "product-details/" + this.model.id + "/" + model.id, {"trigger": true});
        },
        submitMessage: function(message) {
            var appMessageData = message.toAppMessage();
            vslynx.report.submit(message.app, message.instanceId, appMessageData).then(function(response) {
                window.history.back();
            }).fail(function(response) {
                this._handleEmailError(response);
            }.bind(this));
        },
        _buildEmailMessage: function() {
            var message = new EmailMessage({
                product: this.model,
                category: this.category,
                context: "product-catalog",
                bdName: this.bdName
            });

            return message;
        },
        _handleEmailError: function(errorResponse) {
            var errorBody = new ErrorMessage({
                errorResponse: errorResponse,
            });
            var modal = new Modal({
                body: errorBody,
                title: "Error",
                target: $("#app-content")
            });
            modal.render();
        }
    });

    return EmailPage;
});