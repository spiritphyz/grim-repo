(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n === undefined) {
      return array[0];
    }
    if (n === 0) {
      return [];
    }
    return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }
    if (n === 0) {
      return [];
    }
    return array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // es6 definition
  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (let [idx, val] of collection.entries()) {
        iterator(collection[idx], idx, collection);
      }
    } else {
      for (let key of Object.keys(collection)) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(val, idx) {
      if (val === target && result === -1) {
        result = idx;
      }
    });
    return result;
  };

  // es6 definition
  _.indexOf = (collection, target) => {
    let result = -1;
    _.each(collection, (val, idx) => {
      if (val === target && result === -1) {
        result = idx;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    return _.reduce(collection, function(memo, val) {
      if (test(val)) {
        memo.push(val);
      }
      return memo;
    }, []);
  };

  // es6 definition
  _.filter = (collection, test) => {
    return _.reduce(collection, (memo, val) => {
      if (test(val)) {
        memo.push(val);
      }
      return memo;
    }, []);
  };
  
  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val) {
      return !test(val);
    });
  };

  // es6 definition
  _.reject = (collection, test) => 
    _.filter(collection, val => !test(val)); 

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniques = _.reduce(array, function(memo, item) {
      memo[item] = item;
      return memo;
    }, {});
    return _.reduce(uniques, function(memo, item) {
      memo.push(item);
      return memo;
    }, []);
  };

  _.uniq = array => {
    let uniques = _.reduce(array, (memo, item) => {
      memo[item] = item;
      return memo;
    }, {});
    return _.reduce(uniques, (memo, item) => {
      memo.push(item);
      return memo;
    }, []);
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    return _.reduce(collection, function(memo, item) {
      memo.push(iterator(item));
      return memo;
    }, []);
  };

  _.map = (collection, iterator) =>
    _.reduce(collection, (memo, item) => {
      memo.push(iterator(item));
      return memo;
    }, []);

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(obj) {
      return obj[key];
    });
  };

  _.pluck = (collection, key) =>
    _.map(collection, obj => obj[key]);

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var skipRun;
    if (arguments.length < 3) {
      accumulator = collection[0];
      skipRun = true;
    }
    _.each(collection, function(val, idx) {
      if (skipRun === true) {
        skipRun = false;
      } else {
        accumulator = iterator(accumulator, val);
      }
    });
    return accumulator;
  };

  // es6 definition
  _.reduce = (...args) => {
    let skipRun = false;
    let [collection, iterator, accumulator] = args;
    if (args.length < 3) {
      accumulator = collection[0];
      skipRun = true;
    }
    _.each(collection, (val, idx) => {
      if (skipRun) {
        skipRun = false;
      } else {
        accumulator = iterator(accumulator, val);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(memo, item) {
      return memo || target === item;
    }, false);
  };

  // es6 definition
  _.contains = (collection, target) => 
    _.reduce(collection, (memo, item) => memo || target === item, false);

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, function(memo, item) {
      return memo && Boolean(iterator(item));
    }, true);
  };

  // es6 definition
  _.every = (collection, iterator = _.identity) =>
    _.reduce(collection, (memo, item) => memo && Boolean(iterator(item)), true);

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, function(memo, item) {
      return memo || Boolean(iterator(item));
    }, false);
  };

  // es6 definition
  // either every item is false or some are true
  _.some = (collection, iterator = _.identity) => {
    const allFalse = _.every(collection, item => 
      Boolean(iterator(item)) === false);
    return allFalse === true ? false : true;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var objList = [].slice.call(arguments, 1);
    return _.reduce(objList, function(memo, innerObj) {
      _.each(innerObj, function(val, key) {
        memo[key] = val;
      });
      return memo;
    }, obj);
  };

  // es6 definition
  _.extend = (target, ...objList) => {
    return _.reduce(objList, (memo, obj) => {
      for (let key of Object.keys(obj)) {
        memo[key] = obj[key];
      }
      return memo;
    }, target);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(target) {
    var objList = [].slice.call(arguments, 1);
    return _.reduce(objList, function(memo, obj) {
      _.each(obj, function(val, key) {
        if (!memo.hasOwnProperty(key)) {
          memo[key] = val; 
        }
      });
      return memo;
    }, target);
  };

  // es6 definition
  _.defaults = (target, ...objList) => {
    return _.reduce(objList, (memo, obj) => {
      _.each(obj, (val, key) => {
        if (!memo.hasOwnProperty(key)) {
          memo[key] = val;
        }
      });
      return memo;
    }, target);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    var hasRun = false;
    var result;
    return function() {
      if (!hasRun) {
        result = func.apply(this, arguments);
        hasRun = true;
      }
      return result;
    };
  };

  // es6 definition
  _.once = function(func) {
    let hasRun = false;
    let result;
    return (...args) => {
      if (!hasRun) {
        result = func.apply(this, args);
        hasRun = true;
      }
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};
    return function() {
      var args = JSON.stringify(arguments);
      if (!(args in cache)) {
        cache[args] = func.apply(this, arguments);
      }
      return cache[args];
    };
  };

  // es6 definition
  _.memoize = func => {
    const cache = {};
    return (...args) => {
      let argList = JSON.stringify(args);
      if (!(argList in cache)) {
        cache[argList] = func.apply(this, args);
      }
      return cache[argList];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments, 2);
    return setTimeout(function() {
      func.apply(null, args);
    }, wait);
  };

  // es6 definition
  _.delay = (func, wait, ...args) => 
    setTimeout(() => func.apply(null, args), wait);

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copy = array.slice();
    var compareFunc = function() {
      return Math.floor(Math.random() * 3 - 1);
    };
    do {
      copy.sort(compareFunc);
    } while (
      JSON.stringify(array) === JSON.stringify(copy)
    );
    return copy;
  };

  // es6 definition
  _.shuffle = array => {
    let copy = Array.from(array);
    const compareFunc = () => Math.floor(Math.random() * 3 - 1);
    do {
      copy.sort(compareFunc);
    } while (
      JSON.stringify(array) === JSON.stringify(copy)
    );
    return copy;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
   // input:  an array of objects,
   //         then a function (iterator) or a string
   // output: a sorted array of objects
   // constraints:  should handle undefined values,
   //               native length lookup,
   //               change the order of the resulting array as little as possible
   // step by step plan:
   // if iterator is a string, call list's sort func using object-property notation as values
   // otherwise, call list's sort function using return value of iterator as sort value
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arrays = [].slice.call(arguments);
    var max = _.reduce(arrays, function(memo, array) {
      return Math.max(memo, array.length);
    }, 0);
    var result = [];
    for (var i = 0; i < max; i += 1) {
      result.push(_.pluck(arrays, i));
    }
    return result;
  };

  // es6 definition
  _.zip = (...arrays) => {
    const max = _.reduce(arrays, (memo, array) => 
      Math.max(memo, array.length), 0);
    let result = [];
    for (let i = 0; i < max; i += 1) {
      result.push(_.pluck(arrays, i));
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    for (var i = 0; i < nestedArray.length; i += 1) {
      if (Array.isArray(nestedArray[i])) {
        _.flatten(nestedArray[i], result);
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;
  };

  // es6 definition
  _.flatten = (nestedArray, result = []) => {
    for (let item of nestedArray) {
      Array.isArray(item) ? _.flatten(item, result) : result.push(item);
    }
    return result;
  };

  // Using Array.concat()
  _.flatten = function(nestedArray) {
    return _.reduce(nestedArray, function(memo, item) {
      return memo.concat(
        Array.isArray(item) ? _.flatten(item) : item
      );
    }, []);
  };

  // Using Array.concat() and es6
  _.flatten = nestedArray => 
    _.reduce(nestedArray, (memo, item) => 
      memo.concat(Array.isArray(item) ? _.flatten(item) : item), []);

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = [].slice.call(arguments);
    var firstArr = arrays.splice(0, 1)[0];
    var isShared;

    // the first array must contain shared items
    return _.reduce(firstArr, function(memo, item) {
      isShared = _.every(arrays, function(array) {
        return _.contains(array, item);
      });
      return isShared ? (memo.push(item), memo) : memo; 
    }, []);
  };

  // es6 definition
  _.intersection = (...arrays) => {
    const firstArr = Array.from(arrays[0]);
    let isShared;
    // the first array must contain shared items
    return _.reduce(firstArr, (memo, item) => {
      isShared = _.every(arrays, array => _.contains(array, item));
      return isShared ? (memo.push(item), memo) : memo;
    }, []);
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var flat = _.flatten([].slice.call(arguments, 1));
    var uniq = _.uniq(flat);
    return _.reduce(array, function(memo, item) {
      return _.contains(uniq, item) ? memo : (memo.push(item), memo);
    }, []);
  };

  _.difference = (array, ...arrays) => {
    const uniq = _.uniq(_.flatten(arrays));
    return _.reduce(array, (memo, item) => 
      _.contains(uniq, item) ? memo : (memo.push(item), memo), []);
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
