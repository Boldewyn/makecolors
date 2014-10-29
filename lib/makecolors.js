/**
 * create a generator for continuous color delivery
 *
 * The generator returns an array [R, G, B] with each an integer in the
 * [0,255] range.
 *
 * Set make_color_generator.es6compat = true to get an ES6
 * compatible generator.
 *
 * Usage:
 *     var gen = make_color_generator({
 *       r: { frequency: .2, phase: 0 },
 *       g: { frequency: .2, phase: 2 },
 *       b: { frequency: .2, phase: 4 }
 *     });
 *     var color = gen();
 *     var next_color = gen();
 *     var next_but_one_color = gen();
 *     var color_array = [ gen(), gen(), gen(), gen() ];
 *     // loop:
 *     for (var i = 0; i < 10; i++) {
 *       console.log(gen());
 *     }
 */
function make_color_generator(options) {
  var i = -1;

  if (options.center === undefined) {
    options.center = 128;
  }
  if (options.width === undefined) {
    options.width = 127;
  }

  function next() {
    i += 1;
    return ['r','g','b'].map(function(v) {
      return Math.max(0,
        Math.min(255,
          Math.round(
            Math.sin(options[v].frequency*i + options[v].phase) * options.width + options.center
          )
        )
      );
    });
  }

  return (make_color_generator.es6compat?
      {
        next: function() {
          return {
            value: next(),
            done: false
          };
        }
      } :
      next
  );
}
make_color_generator.es6compat = false;

/* global module */
if (module && module.exports) {
  module.exports = make_color_generator;
}

//EOF
