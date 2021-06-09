/* [BEGIN] LocalStorage Helper [BEGIN] */
// import $ from 'jquery';

export const lStorage = {
    isSupported: function () {
        try {
            var itemBackup = localStorage.getItem("");
            localStorage.removeItem("");
            localStorage.setItem("", itemBackup);
            if (itemBackup === null)
                localStorage.removeItem("");
            else
                localStorage.setItem("", itemBackup);
            return true;
        }
        catch (e) {
            return false;
        }
    },
    hasData: function (key) {
        return !!localStorage[key] && !!localStorage[key].length;
    },
    get: function (key) {
        if (!lStorage.hasData(key)) {
            return false;
        }
        var data = localStorage[key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    },
    set: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) { localStorage.setItem(key, value); }
    },
    // extend: function (key, value) {
    //     if (lStorage.hasData(key)) {
    //         var _value = lStorage.get(key);
    //         $.extend(_value, JSON.parse(JSON.stringify(value)));
    //         lStorage.set(key, _value);
    //     }
    //     else {
    //         lStorage.set(key, value);
    //     }
    // },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    removeAll: (keys) => {
        return new Promise((resolve) => {
            resolve(keys.forEach((key) => localStorage.removeItem(key)));
        });
    },
    getBackup: () => {
        var backup = {};
        for (var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            backup[key] = value;
        }
        return backup;
    },
    applyBackup: (backup, fClear, fOverwriteExisting) => {
        if (fClear === void 0) { fClear = true; }
        if (fOverwriteExisting === void 0) { fOverwriteExisting = true; }
        if (fClear === true) {
            localStorage.clear();
        }
        for (var key in backup) {
            if (fOverwriteExisting === false && backup[key] !== undefined) {
                continue;
            }
            var value = backup[key];
            localStorage.setItem(key, value);
        }
    },
    getRemainingSpace: () => {
        var itemBackup = localStorage.getItem("");
        var increase = true;
        var data = "1";
        var totalData = "";
        var trytotalData = "";
        while (true) {
            try {
                trytotalData = totalData + data;
                localStorage.setItem("", trytotalData);
                totalData = trytotalData;
                if (increase)
                    data += data;
            }
            catch (e) {
                if (data.length < 2) {
                    break;
                }
                increase = false;
                data = data.substr(data.length / 2);
            }
        }
        if (itemBackup === null)
            localStorage.removeItem("");
        else
            localStorage.setItem("", itemBackup);
        return totalData.length;
    },
    getMaximumSize: () => {
        var backup = lStorage.getBackup();
        localStorage.clear()
        var max = lStorage.getRemainingSpace();
        lStorage.applyBackup(backup);
        return max;
    },
    info: (fShowMaximumSize) => {
        if (fShowMaximumSize === void 0) { fShowMaximumSize = false; }
        var amount = 0;
        var size = 0;
        for (var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i)
            var value = localStorage.getItem(key);
            console.log(amount, key, value);
            size += key.length + value.length;
            amount++;
        }
        console.log("Total entries:", amount);
        console.log("Total size:", size);
        if (fShowMaximumSize === true) {
            var maxSize = lStorage.getMaximumSize();
            console.log("Total size:", maxSize);
        }
    }
};
/* [END] LocalStorage Helper [END] */