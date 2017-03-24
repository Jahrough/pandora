/*
 * @method - pandoraTrackIMG
 * @description - Pandora tracking image
 */
var pandoraTrackIMG = (function (document, window) {
    'use strict';

    /*
     * @method - getParamVal
     * @description - extract url parameter value by name
     * @param {string} [url] - Optional
     * @param {string} param
     * @return {function}
     */
    var getParamVal = function (url) {
        url = url || window.location.search;

        return function (param) {
            var name = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(url);

            return ((results === null) ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')));
        };
    };

    /*
     * @method - paramsObj
     * @description - store selected parameters in object
     * @param {array} selectedParamsArray
     * @param {string} [url] - Optional
     * @return {object}
     */
    var paramsObj = function (selectedParamsArray, url) {
        var paramVal = getParamVal(url);
        var count = (Array.isArray('selectedParamsArray') ? selectedParamsArray.length : 0);
        var obj = {};
        var i;

        for (i = count; i > 0; i--) {
            obj[i] = paramVal(selectedParamsArray[i]);
        }

        return obj;
    };

    /*
     * @method - buildPandoraIMG
     * @description - build pandora image
     * @param {object} paramsObject
     * @return {Node}
     */
    var buildPandoraIMG = function (paramsObject) {
        var img = document.createElement('img');
        var uniqueKey = ord || Math.random() * 10000000000000000;
        var src = '//stats.pandora.com/tracking/' + uniqueKey + '/type::ad_tracking_pixel/ctype::sampleadvertiser/etype::conversion/';
        src += 'oid::[' + paramsObject.oid + ']/aid::[' + paramsObject.aid + ']/cid::[' + paramsObject.cid + ']';

        return img.setAttribute('src', src);
    };

    /*
     * @method - init
     * @description - Initialize Pandora tracking image
     * @return {undefined}
     */
    var init = function () {
        var OptionalURL = '//crossinternational.org/pandora?oid=257797336&aid=96974776&cid=30959773216';
        var selectedParamsArray = ['oid', 'aid', 'cid'];
        var params = paramsObj(selectedParamsArray, OptionalURL);

        if ((typeof params === 'object') && params.hasOwnProperty('oid') && params.hasOwnProperty('aid') && params.hasOwnProperty('cid')) {
            document.body.appendChild(buildPandoraIMG(params));
        }
    };

    return function () {
        init();
    };

}(document, window));




// Initialize Pandora tracking image
pandoraTrackIMG();
