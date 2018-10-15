'use strict';

var isObject = (value) => {
	return value && typeof value === 'object' && value.constructor === Object;
};

var isString = (value) => {
  return typeof value === 'string' || value instanceof String;
};

var isNumber = (value) => {
	return typeof value === 'number' && isFinite(value);
};

var isBoolean = (value) => {
	return typeof value === 'boolean';
};

var isArray = (value) => {
	return Array.isArray(value);
};

var isNull = (value) => {
	return value === null;
};

var isUndefined = (value) => {
	return typeof value === 'undefined';
};

module.exports = {
	isObject: isObject,
	isString: isString,
	isNumber: isNumber,
	isBoolean: isBoolean,
	isArray: isArray,
	isNull: isNull,
	isUndefined: isUndefined
};