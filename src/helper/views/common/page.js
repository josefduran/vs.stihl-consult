// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

define(function(require) {
    "use strict";

    var BasePage = require("common/js/views/page");
    var NavMenu = require("product-catalog/js/views/common/nav");

    var ProductCatalogPage = BasePage.extend({
        emailProductInfo: function(category, product) {
            var emailUrl = "#email";

            if (category !== undefined) {
                emailUrl += "/" + category.id;
            }

            if (product !== undefined) {
                emailUrl += "/" + product.id;
            }

            this.trigger("navigate", emailUrl, {trigger: true});
        },
        _buildNav: function(category, product) {
            var menu = new NavMenu();
            this._setNavListeners(menu, category, product);
            return menu;
        },
        _setNavListeners: function(menu, category, product) {
            this.stopListening(menu, "email");
            this.listenTo(menu, "email", function() {
                this.emailProductInfo(category, product);
            }.bind(this));
            this.stopListening(menu, "quickPick");
            this.listenTo(menu, "quickPick", function() {
                this._goToQuickPick(category, product);
            }.bind(this));
        },
        _goToQuickPick: function(category, product) {
            var quickPickUrl = "#quick-pick";

            if (category !== undefined) {
                quickPickUrl += "/" + category.id;
            }

            if (product !== undefined) {
                quickPickUrl += "/" + product.id;
            }

            this.trigger("navigate", quickPickUrl, {trigger: true});
        }
    });

    return ProductCatalogPage;
});
