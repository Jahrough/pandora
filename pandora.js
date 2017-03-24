(function (document, window) {
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
            var name = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
                regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(url);

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
        var paramVal = getParamVal(url),
            count = selectedParamsArray.length,
            i, obj = {};

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
        var img = document.createElement('img'),
            ord = ord || Math.random() * 10000000000000000,
            src = '//stats.pandora.com/tracking/' + ord + '/type::ad_tracking_pixel/ctype::sampleadvertiser/etype::conversion/';
        src += 'oid::[' + paramsObject.oid + ']/aid::[' + paramsObject.aid + ']/cid::[' + paramsObject.cid + ']';

        return img.setAttribute('src', src);
    };



    /*
     * @method - init
     * @description - Initialize Pandora tracking image
     * @return {undefined}
     */
    var init = (function () {
        var OptionalURL = '//crossinternational.org/pandora?oid=257797336&aid=96974776&cid=30959773216',
            selectedParamsArray = ['oid', 'aid', 'cid'],
            params = paramsObj(selectedParamsArray, OptionalURL),
            img;

        if ((typeof params === 'object') && params.hasOwnProperty('oid') && params.hasOwnProperty('aid') && params.hasOwnProperty('cid')) {
            img = buildPandoraIMG(params);
            document.body.appendChild(img);
        }

    }());




}(document, window));
