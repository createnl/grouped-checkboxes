// Source: https://github.com/tracker1/node-uuid4/blob/master/browser.js

export default (): string => {
    const getBytes = (): number[] => {
        try {
            return Array.from(
                // @ts-ignore
                // Modern Browser
                (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(16))
            );
        } catch (error) {
            // Legacy Browser, fallback to Math.random
            const ret = [];
            while (ret.length < 16) ret.push((Math.random() * 256) & 0xff);
            return ret;
        }
    };

    const m = (v: number): string => {
        let vString = v.toString(16);
        if (vString.length < 2){
            vString = "0" + v;
        }

        return vString;
    };

    const rnd = getBytes();
    rnd[6] = (rnd[6] & 0x0f) | 0x40;
    rnd[8] = (rnd[8] & 0x3f) | 0x80;

    return rnd
        .map(m)
        .join("");
}
