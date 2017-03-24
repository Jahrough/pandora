(function () {
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
            i, obj = {};

        for (i = selectedParamsArray.length; i > 0; i--) {
            obj[i] = paramVal(selectedParamsArray[i]);
        }

        return obj;
    };


    /*
     * @method - buildPandoraIMG
     * @description - build pandora image
     * @param {object} paramsObject
     * @return {string}
     */
    var buildPandoraIMG = function (paramsObject) {
        var ord = ord || Math.random() * 10000000000000000,
            src = '//stats.pandora.com/tracking/' + ord + '/type::ad_tracking_pixel/ctype::sampleadvertiser/etype::conversion/';

        if (typeof paramsObject === 'object' && paramsObject.hasOwnProperty('oid') && paramsObject.hasOwnProperty('aid') && paramsObject.hasOwnProperty('cid')) {
            src += 'oid::[' + paramsObject.oid + ']/aid::[' + paramsObject.aid + ']/cid::[' + paramsObject.cid + ']';
        }

        return '<img src="' + src + '">';
    };




    var OptionalURL = 'http://crossinternational.org/pandora?oid=257797336&aid=96974776&cid=30959773216',
        selectedParamsArray = ['oid', 'aid', 'cid'],
        params = paramsObj(selectedParamsArray, OptionalURL),
        img = buildPandoraIMG(params);

    document.write(img);



}());
