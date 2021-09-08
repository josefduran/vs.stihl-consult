// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

define(function(require) {
    "use strict";

    var Backbone = require("backbone");

    var BaseView = require("common/js/views/base");

    // Templates
    var template = require("product-catalog/templates/email/error-message.html");

    var ErrorMessage = BaseView.extend({
        template: template,
        initialize: function(options) {
            this.model = new Backbone.Model({
                message: this._determineMessage(options.errorResponse),
            });
        },
        _determineMessage: function(errorResponse) {
            if (errorResponse.status === 251) {
                return "The operation is not supported on this platform.";
            }
            return "An unknown error has occurred.";
        }
    });

    return ErrorMessage;
});