'use strict';

exports.init = function () {
    Object.defineProperties(Object.prototype, {
        checkHasKeys: {
            value: function (keys) {
                checkTypes([{}, []], this);
                var thisKeys = [];
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        thisKeys.push(key);
                    }
                }
                return isArraysEqual(thisKeys, keys);
            }
        },
        checkContainsKeys: {
            value: function (keys) {
                checkTypes([{}, []], this);
                for (var i = 0; i < keys.length; i++) {
                    if (!this.hasOwnProperty(keys[i])) {
                        return false;
                    }
                }
                return true;
            }
        },
        checkHasValueType: {
            value: function (key, type) {
                checkTypes([{}, []], this);
                return this.hasOwnProperty(key) && checkType.call(this[key], new type());
            }
        },
        checkContainsValues: {
            value: function (values) {
                checkTypes([{}, []], this);
                var thisValues = [];
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        thisValues.push(this[key]);
                    }
                }
                for (var i = 0; i < values; i++) {
                    if (thisValues.indexOf(values[i]) === -1) {
                        return false;
                    }
                }
                return true;
            }
        },
        checkHasValues: {
            value: function (values) {
                checkTypes([{}, []], this);
                var thisValues = [];
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        thisValues.push(this[key]);
                    }
                }
                return isArraysEqual(thisValues, values);
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
            value: function (count) {
                return this.trim().split(/\s+/).length === count;
            }
        }
    });
    Object.defineProperties(Function.prototype, {
        checkHasParamsCount: {
            value: function (count) {
                return this.length === count;
            }
        }
    });
};

function isArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1 && arr2.indexOf(arr1[i]) === -1) {
            return false;
        }
    }
    return true;
}

function checkHasLength(len) {
    return this.length === len;
}

function checkTypes(types, type) {
    if (!types.some(checkType, type)) {
        throw new Error('No such method for type ' + Object.prototype.toString.call(type));
    }
}

function checkType(type) {
    return Object.prototype.toString.call(this) === Object.prototype.toString.call(type);
}
