

from math import sin


def _f(options, i):
    def __f(v):
        return max(0,
            min(255,
                int(round(
                    sin(options[v]['frequency']*i + options[v]['phase']) * options['width'] + options['center']
                ))
            )
        )
    return __f


def make_color_generator(options):
    """"""
    i = -1

    if 'center' not in options:
        options['center'] = 128
    if 'width' not in options:
        options['width'] = 127

    while True:
        i += 1;
        yield map(_f(options, i), ['r','g','b'])


#EOF
