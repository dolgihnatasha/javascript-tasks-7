'use strict';

exports.init = function () {

    Object.defineProperties(Object.prototype, {
        checkHasKeys: {
            value: function checkHasKeys(keys) {
                if (this.constructor !== Object && this.constructor !== Array) {
                    throw new Error("No such method for type " + this.constructor.name);
                }
                var this_keys = Object.keys(this).sort();
                keys = keys.sort();
                if (this_keys.length !== keys.length) {
                    return false;
                }
                keys = this_keys.filter(isEqual(keys));
                return keys.length === 0;
            }
        },
        checkContainsKeys: {
            value: function checkContainsKeys(keys) {
                if (this.constructor !== Object && this.constructor !== Array) {
                    throw new Error("No such method for type " + this.constructor.name);
                }
                for (var i = 0; i < keys.length; i++) {
                    if (!this.hasOwnProperty(keys[i])) {
                        return false;
                    }
                }
                return true;
            }
        },
        checkHasValueType: {
            value: function checkHasValueType(val, type) {
                if (this.constructor !== Object && this.constructor !== Array) {
                    throw new Error("No such method for type " + this.constructor.name);
                }
                return this.hasOwnProperty(val) && this[val].constructor === type;
            }
        },
        checkContainsValues: {
            value: function checkContainsValues(values) {
                if (this.constructor !== Object && this.constructor !== Array) {
                    throw new Error("No such method for type " + this.constructor.name)
                }
                for (var value of this) {
                    if (values.indexOf(value) !== -1) {
                        values.splice(values.indexOf(value), 1)

                    }
                }
                return values.length === 0;
            }
        },
        checkHasValues: {
            value: function checkHasValues(values) {
                if (this.constructor !== Object && this.constructor !== Array) {
                    throw new Error("No such method for type " + this.constructor.name);
                }
                var this_values = [];
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        this_values.add(this[key]);
                    }
                }
                if (this_values.length !== values) {
                    return false;
                }
                this_values = this_values.sort();
                values = values.sort();
                values = this_values.filter(isEqual(values));
                return values.length === 0;

            }
        }
    });
    Object.defineProperties(Array.prototype, {
        checkHasLength: {
            value: checkHasLength
        }
    });
    Object.defineProperties(String.prototype, {
        checkHasLength: {
            value: checkHasLength
        },
        checkHasWordsCount: {
            value: function checkHasWordsCount(count) {
                return this.split(' ').length === count;
            }
        }
    });
    Object.defineProperties(Function.prototype, {
        checkHasParamsCount: {
            value: function checkHasParamsCount(count) {
                return this.length === count;
            }
        }
    })
};

function isEqual(collection) {
    return function (elem, i) {
        return elem !== collection[i];
    }
}

function checkHasLength(len) {
    return this.length === len;
}
