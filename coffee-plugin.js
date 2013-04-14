// Generated by CoffeeScript 1.6.2
(function() {
  var coffee, fs,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  fs = require('fs');

  coffee = require('coffee-script');

  module.exports = function(wintersmith, callback) {
    var CoffeePlugin;

    CoffeePlugin = (function(_super) {
      __extends(CoffeePlugin, _super);

      function CoffeePlugin(_filename, _text) {
        this._filename = _filename;
        this._text = _text;
      }

      CoffeePlugin.prototype.getFilename = function() {
        return this._filename.relative.replace(/coffee$/, 'js');
      };

      CoffeePlugin.prototype.getView = function() {
        return function() {
          var args, callback, _i;

          args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
          return coffee.compile(this._text, function(err, data) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, new Buffer(data));
            }
          });
        };
      };

      CoffeePlugin.fromFile = function(filename, callback) {
        return fs.readFile(filename.full, function(err, buffer) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, new CoffeePlugin(filename, buffer.toString()));
          }
        });
      };

      return CoffeePlugin;

    })(wintersmith.ContentPlugin);
    wintersmith.registerContentPlugin('coffee', '**/*.coffee', CoffeePlugin);
    return callback();
  };

}).call(this);
