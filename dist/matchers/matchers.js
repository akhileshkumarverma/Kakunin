'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.separator = undefined;

var _matcher = require('./matcher');

var matchers = _interopRequireWildcard(_matcher);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const separator = exports.separator = ':';

class Matchers {
  constructor() {
    this.availableMatchers = [matchers.regexMatcher, matchers.clickableMatcher, matchers.invisibleMatcher, matchers.notClickableMatcher, matchers.presentMatcher, matchers.textMatcher, matchers.visibleMatcher, matchers.attributeMatcher, matchers.currentDateMatcher];
  }

  addMatcher(matcher) {
    this.availableMatchers.push(matcher);
  }

  match(element, matcherName) {
    const splittedValue = matcherName.split(separator);
    const matcher = this.findMatcher(splittedValue[0], splittedValue.slice(1));

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, ...splittedValue.slice(1));
  }

  findMatcher(prefix, params) {
    return this.availableMatchers.find(matcher => matcher.isSatisfiedBy(prefix, ...params));
  }
}

const create = exports.create = () => new Matchers();