/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const copiedObj = {};
  return Object.assign(copiedObj, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  const mergedObj = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (mergedObj[key]) {
        mergedObj[key] += value;
      } else {
        mergedObj[key] = value;
      }
    });
  });
  return mergedObj;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, 'age') => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const objCorrected = obj;
  keys.forEach((key) => {
    delete objCorrected[key];
  });
  return objCorrected;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const keyA = Object.keys(obj1);
  const keyB = Object.keys(obj2);
  if (keyA.length !== keyB.length) return false;
  return keyA.every((key) => obj1[key] === obj2[key]);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const letters = [];
  Object.keys(lettersObject).forEach((letter) => {
    lettersObject[letter].forEach((index) => {
      letters[index] = letter;
    });
  });
  return letters.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const payments = {
    25: 0,
    50: 0,
  };
  for (let i = 0; i < queue.length; i += 1) {
    switch (queue[i]) {
      case 100: {
        let rest = 75;
        if (payments[50]) {
          rest -= 50;
          payments[50] -= 1;
        }
        while (rest > 0 && payments[25] > 0) {
          rest -= 25;
          payments[25] -= 1;
        }
        if (rest !== 0) return false;
        payments[queue[i]] += 1;
        break;
      }
      case 50:
        if (payments[25] === 0) return false;
        payments[25] -= 1;
        payments[50] += 1;
        break;
      default:
        payments[25] += 1;
        break;
    }
  }
  return true;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const templateObj = JSON.parse(json);
  const emptyObject = Object.create(proto);
  return Object.assign(emptyObject, templateObj);
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  const arrayToSort = arr;
  arrayToSort.sort((a, b) => {
    let isABigger = 0;
    if (a.country[0] === b.country[0]) {
      isABigger = a.city[0] > b.city[0] ? 1 : -1;
    } else {
      isABigger = a.country[0] > b.country[0] ? 1 : -1;
    }
    return isABigger;
  });
  return arrayToSort;
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const arrayMap = array.map((element) => {
    const pair = [keySelector(element)];
    const values = array.reduce((acc, item) => {
      if (keySelector(element) === keySelector(item)) {
        acc.push(valueSelector(item));
      }
      return acc;
    }, []);
    pair.push(values);
    return pair;
  });
  return new Map(arrayMap);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  selectors: [],
  order: ['element', 'id', 'class', 'attr', 'pseudoclass', 'pseudoelement'],
  checkOrder(n) {
    if (this.selectors.length) {
      const lastElements = this.selectors.map((selector) => selector.type);
      if (this.order.slice(n).some((e) => lastElements.includes(e)))
        throw new Error(
          'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        );
    }
  },
  checkType(type) {
    if (this.selectors.filter((e) => e.type === type).length >= 1)
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
  },

  element(value) {
    this.checkType('element');
    this.checkOrder(1);
    const copyThis = {};
    Object.assign(copyThis, this);
    copyThis.selectors.push({ selector: value, type: 'element' });
    this.selectors = [];
    return copyThis;
  },

  id(value) {
    const copyThis = {};
    this.checkType('id');
    this.checkOrder(2);
    Object.assign(copyThis, this);
    copyThis.selectors.push({ selector: `#${value}`, type: 'id' });
    this.selectors = [];
    return copyThis;
  },

  class(value) {
    this.checkOrder(3);
    const copyThis = {};
    Object.assign(copyThis, this);
    copyThis.selectors.push({ selector: `.${value}`, type: 'class' });
    this.selectors = [];
    return copyThis;
  },

  attr(value) {
    this.checkOrder(4);
    const copyThis = {};
    Object.assign(copyThis, this);
    copyThis.selectors.push({ selector: `[${value}]`, type: 'attr' });
    this.selectors = [];
    return copyThis;
  },

  pseudoClass(value) {
    this.checkOrder(5);
    const copyThis = {};
    Object.assign(copyThis, this);
    copyThis.selectors.push({ selector: `:${value}`, type: 'pseudoclass' });
    this.selectors = [];
    return copyThis;
  },

  pseudoElement(value) {
    this.checkType('pseudoelement');
    const copyThis = {};
    Object.assign(copyThis, this);
    copyThis.selectors.push({ selector: `::${value}`, type: 'pseudoelement' });
    this.selectors = [];
    return copyThis;
  },

  combine(selector1, combinator, selector2) {
    const copyThis = {};
    Object.assign(copyThis, this);
    copyThis.selectors.push(
      ...selector1.selectors,
      { selector: ` ${combinator} `, type: 'combinator' },
      ...selector2.selectors
    );
    this.selectors = [];
    return copyThis;
  },

  stringify() {
    const result = this.selectors.map((item) => item.selector).join('');
    this.selectors = [];
    return result;
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
