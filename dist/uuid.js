"use strict";
// Source: https://github.com/tracker1/node-uuid4/blob/master/browser.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    var getBytes = function () {
        try {
            return Array.from(
            // @ts-ignore
            // Modern Browser
            (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(16)));
        }
        catch (error) {
            // Legacy Browser, fallback to Math.random
            var ret = [];
            while (ret.length < 16)
                ret.push((Math.random() * 256) & 0xff);
            return ret;
        }
    };
    var m = function (v) {
        var vString = v.toString(16);
        if (vString.length < 2) {
            vString = "0" + v;
        }
        return vString;
    };
    var rnd = getBytes();
    rnd[6] = (rnd[6] & 0x0f) | 0x40;
    rnd[8] = (rnd[8] & 0x3f) | 0x80;
    return rnd
        .map(m)
        .join("");
});
//# sourceMappingURL=uuid.js.map