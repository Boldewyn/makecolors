<?php

/**
 * create a generator for continuous color delivery
 *
 * The generator returns an array [R, G, B] with each an integer in the
 * [0,255] range.
 *
 * Usage:
 *     $gen = make_color_generator([
 *         "r" => [ "frequency" => .2, "phase" => 0 ],
 *         "g" => [ "frequency" => .2, "phase" => 2 ],
 *         "b" => [ "frequency" => .2, "phase" => 4 ]
 *     ]);
 *     $color = $gen();
 *     $next_color = $gen();
 *     for ($i = 0; $i < 10; $i++) {
 *         var_dump($gen());
 *     }
 */
function make_color_generator($options) {
    $i = -1;

    if (! isset($options['center'])) {
        $options['center'] = 128;
    }
    if (! isset($options['width'])) {
        $options['width'] = 127;
    }

    return function () use (&$i, $options) {
        $i += 1;
        return array_map(function($v) use ($i, $options) {
            return max(0,
                min(255,
                    round(
                        sin($options[$v]['frequency']*$i +
                            $options[$v]['phase']) *
                        $options['width'] + $options['center']
                    )
                )
            );
        }, array('r','g','b'));
    };
}

#EOF
