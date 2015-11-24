'use strict';

exports.init = function () {
    Object.defineProperties(Object.prototype, {
        checkHasKeys: {
            value: function checkHasKeys(keys) {
                checkTypes([Object, Array], this);
                var thisKeys = Object.keys(this);
                return isEqual(thisKeys, keys)
            }
        },
        checkContainsKeys: {
            value: function checkContainsKeys(keys) {
                checkTypes([Object, Array], this);
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
                checkTypes([Object, Array], this);
                return this.hasOwnProperty(val) &&
                    typeof this[val] === type.toString().slice(9, -20).toLowerCase();
            }
        },
        checkContainsValues: {
            value: function checkContainsValues(values) {
                checkTypes([Object, Array], this);
                var thisValues = [];
                for (var key in Object.keys(this)) {
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
            value: function checkHasValues(values) {
                checkTypes([Object, Array], this);
                var thisValues = [];
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        thisValues.add(this[key]);
                    }
                }
                return isEqual(thisValues, values);
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
                return this.trim().split(/\s+/).length === count;
            }
        }
    });
    Object.defineProperties(Function.prototype, {
        checkHasParamsCount: {
            value: function checkHasParamsCount(count) {
                return this.length === count;
            }
        }
    });
};

function isEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    arr1 = arr1.sort();
    arr2 = arr2.sort();
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function checkHasLength(len) {
    return this.length === len;
}

function checkTypes(types, _this) {
    if (!types.some(checkType, _this)){
        throw new Error("No such method for type " + (typeof this));
    }
}

function checkType(type) {
    // это выглядит как костыль -_-
    return type.toString().slice(9, -20).toLowerCase() !== (typeof this);
}
