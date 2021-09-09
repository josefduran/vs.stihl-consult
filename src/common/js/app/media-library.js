// Copyright 2019 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

define(function () {
    "use strict";

    /**
     * Audible click functionality on button click
     */
    const vslynx = require("@spectrio/vs.vslynx-es6");
    const buttonClick = require("common/resources/button-click.mp3");

    const DEBOUNCE_MS = 100;
    let buttonClickDebounce = false;

    const playClickSound = function () {
        if (!buttonClickDebounce) {
            buttonClickDebounce = true;
            vslynx.audio.play(buttonClick);
            setTimeout(function () {
                buttonClickDebounce = false;
            }, DEBOUNCE_MS);
        }
    };

    /**
     * Url root functions and constants
     */
    const imageRoot = "data/product-catalog/images";
    const getVideoRootUrl = function (video) {
        let root = `library/video-gallery/${video.get("categoryId")}`;
        if (video.get("productId") !== null) {
            root += `/${video.get("productId")}`;
        }
        return root;
    };


    /**
     * Audible clicker and image url functions
     */
    return {
        audio: {
            playClickSound
        },


        accessoryType: {
            getThumbnailUrl: function (accessoryType) { return `${imageRoot}/${accessoryType.id}-250-200.jpg`; }
        },


        category: {
            getShowcaseUrl: function (cat) { return `library/categories/${cat.id}/showcase.jpg`; },
            getThumbnailUrl: function (cat) { return `${imageRoot}/${cat.get("featuredProduct").id}-250-200.jpg`; }
        },


        feature: {
            getMissingThumbnailUrl: function () { return "img/product-catalog/missing_feature.jpg"; },
            getThumbnailUrl: function (feature) { return `${imageRoot}/${feature.id}-82-82.jpg`; }
        },


        powerTool: {
            getCompareUrl: function (tool) { return `${imageRoot}/${tool.id}-450-225.jpg`; },
            getShowcaseUrl: function (tool) { return `${imageRoot}/${tool.id}-1000-800.jpg`; },
            getThumbnailUrl: function (tool) { return `${imageRoot}/${tool.id}-250-125.jpg`; },
            getTileUrl: function (tool) { return `${imageRoot}/${tool.id}-250-200.jpg`; },
        },


        video: {
            getThumbnailUrl: function (video) { return `${getVideoRootUrl(video)}/${video.get("id")}.jpg`; },
            getVideoUrl: function (video) { return `${getVideoRootUrl(video)}/${video.get("id")}.mp4`; }
        }
    };
});
