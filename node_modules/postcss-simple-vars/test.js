import postcss from 'postcss';
import test    from 'ava';

import vars from './';

function run(t, input, output, opts = { }) {
    t.same(postcss(vars(opts)).process(input).css, output);
}

test('replaces variables in values', t => {
    run(t, '$size: 10px;\na{ width: $size; height: $size }',
           'a{ width: 10px; height: 10px }');
});

test('replaces vars in property names', t => {
    run(t, '$prop: width; a{ $(prop): 1px }', 'a{ width: 1px }');
});

test('replaces vars inside property names', t => {
    run(t, '$dir: top; a{ margin-$(dir): 1px }', 'a{ margin-top: 1px }');
});

test('allows dashes and digits in variable name', t => {
    run(t, '$a-b_10: 1;\na{ one: $a-b_10 a$(a-b_10) }', 'a{ one: 1 a1 }');
});

test('needs space before variable', t => {
    run(t, '$size: 10px; a { width: one$size }', 'a { width: one$size }');
});

test('does not remove first symbol', t => {
    run(t, 'a{ a: 1 $a }', 'a{ a: 1 1 }', { variables: { a: 1 } });
});

test('allows to use in negative numbers', t => {
    run(t, 'a{ a: -$a }', 'a{ a: -1 }', { variables: { a: 1 } });
});

test('replaces multiple variables', t => {
    run(t, 'a{ a: $a $a }', 'a{ a: 1 1 }', { variables: { a: 1 } });
});

test('has second syntax for varibles', t => {
    run(t, '$size: 10; a { width: $(size)px }', 'a { width: 10px }');
});

test('replaces variables in selector', t => {
    run(t, '$name: a; $name $(name)b { }', 'a ab { }');
});

test('replaces variables in at-rule params', t => {
    run(t, '$name: a; @at $name; @at $(name)b { }', '@at a; @at ab { }');
});

test('parses at-rule without params', t => {
    run(t, '@atrule{}', '@atrule{}');
});

test('overrides variables', t => {
    run(t, '$var: 1; a{ one: $var } b{ $var: 2; two: $var } c{ two: $var }',
           'a{ one: 1 } b{ two: 2 } c{ two: 2 }');
});

test('throws an error on unknown variable', t => {
    t.throws( () => {
        run(t, 'a{ width: -$size }');
    }, 'postcss-simple-vars: <css input>:1:4: Undefined variable $size');
});

test('allows to silent errors', t => {
    run(t, 'a{ width: $size }', 'a{ width: $size }', { silent: true });
});

test('gets variables from options', t => {
    run(t, 'a{ width: $one }', 'a{ width: 1 }', { variables: { one: 1 } });
});

test('works with any syntax in option', t => {
    run(t, 'a{ width: $one }', 'a{ width: 1 }', { variables: { $one: 1 } });
});

test('cans get variables only from option', t => {
    run(t, '$one: 2; $two: 2; a{ one: $one $two }',
           '$one: 2; $two: 2; a{ one: 1 $two }',
           { only: { one: 1 } });
});

test('works with false value', t => {
    run(t, 'a{ zero: $zero }', 'a{ zero: 0 }', { variables: { zero: 0 } });
});

test('allows to use var in other vars', t => {
    run(t, '$one: 1; $two: $one 2; a{ value: $two }', 'a{ value: 1 2 }');
});

test('set default values by function', t => {
    let value;
    let config = () => {
        return { config: value };
    };

    value = 1;
    run(t, 'a{ width: $config }', 'a{ width: 1 }', { variables: config });

    value = 2;
    run(t, 'a{ width: $config }', 'a{ width: 2 }', { variables: config });
});

test('has callback for unknown variable', t => {
    let result  = [];
    let unknown = (node, name) => {
        result.push([node.prop, name]);
    };

    run(t, 'a{width:$one}', 'a{width:$one}', { unknown: unknown });
    t.same(result, [['width', 'one']]);
});

test.cb('has callback for exporting variables', t => {
    run(t, '$one: 1;', '', {
        onVariables: (variables) => {
            t.same(variables.one, '1');
            t.end();
        }
    });
});

test('overrides unknown variable', t => {
    let unknown = () => 'unknown';
    run(t, 'a{width:$one}', 'a{width:unknown}', { unknown: unknown });
});
