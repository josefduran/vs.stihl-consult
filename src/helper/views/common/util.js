// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

define(function(require) {
    "use strict";

    var HREF_CHANGE_DELAY_MS = 200;

    var changeLocation = function(url) {
        setTimeout(function() {
            document.location.href = url;
        }, HREF_CHANGE_DELAY_MS);
    };

    var generateUuid = function() {
        // From:  http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        // see: http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        var i;
        for (i = 0; i < 36; i+=1) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };

    var goBack = function() {
        setTimeout(function() {
            window.history.back();
        }, HREF_CHANGE_DELAY_MS);
    };

    var goHome = function() {
           changeLocation("index.html");
    };

    var getRatingInfo = function(rating, reviewCount) {
        var ratingInt = Math.floor(rating);
        var ratingDec = Math.round((rating - ratingInt) * 10);
        return {
            showRating: !!(reviewCount),
            ratingUrl: `img/common/ratings/rating-${ratingInt}_${ratingDec}.gif`,
            rating: ratingInt + (ratingDec / 10),
        };
    };

    return {
        changeLocation: changeLocation,
        generateUuid: generateUuid,
        goBack: goBack,
        goHome: goHome,
        getRatingInfo: getRatingInfo,
    };
});
