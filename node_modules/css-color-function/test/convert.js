
var assert = require('assert');
var color = require('..');

function convert (string, expected) {
  string = 'color(' + string + ')';
  assert.equal(color.convert(string), expected);
}

describe('#convert', function () {

  describe('red', function () {
    it('should set red', function () {
      convert('red red(25)', 'rgb(25, 0, 0)');
    });

    it('should set red by percentage', function () {
      convert('black red(10%)', 'rgb(26, 0, 0)');
    });

    it('should add red', function () {
      convert('rgb(100, 0, 0) red(+ 25)', 'rgb(125, 0, 0)');
    });

    it('should add red by percentage', function () {
      convert('rgb(50, 0, 0) red(+ 10%)', 'rgb(55, 0, 0)');
    });

    it('should subtract red', function () {
      convert('rgb(50, 0, 0) red(- 25)', 'rgb(25, 0, 0)');
    });

    it('should subtract red by percentage', function () {
      convert('rgb(50, 0, 0) red(- 10%)', 'rgb(45, 0, 0)');
    });

    it('should multiply red', function () {
      convert('rgb(250, 0, 0) red(* .1)', 'rgb(25, 0, 0)');
    });

    it('should multiply red by percentage', function () {
      convert('rgb(250, 0, 0) red(* 10%)', 'rgb(25, 0, 0)');
    });
  });

  describe('green', function () {
    it('should set green', function () {
      convert('green green(25)', 'rgb(0, 25, 0)');
    });

    it('should set green by percentage', function () {
      convert('black green(10%)', 'rgb(0, 26, 0)');
    });

    it('should add green', function () {
      convert('rgb(0, 100, 0) green(+ 25)', 'rgb(0, 125, 0)');
    });

    it('should add green by percentage', function () {
      convert('rgb(0, 50, 0) green(+ 10%)', 'rgb(0, 55, 0)');
    });

    it('should subtract green', function () {
      convert('rgb(0, 50, 0) green(- 25)', 'rgb(0, 25, 0)');
    });

    it('should subtract green by percentage', function () {
      convert('rgb(0, 50, 0) green(- 10%)', 'rgb(0, 45, 0)');
    });

    it('should multiply green', function () {
      convert('rgb(0, 250, 0) green(* .1)', 'rgb(0, 25, 0)');
    });

    it('should multiply green by percentage', function () {
      convert('rgb(0, 250, 0) green(* 10%)', 'rgb(0, 25, 0)');
    });
  });

  describe('blue', function () {
    it('should set blue', function () {
      convert('blue blue(25)', 'rgb(0, 0, 25)');
    });

    it('should set blue by percentage', function () {
      convert('blue blue(10%)', 'rgb(0, 0, 26)');
    });

    it('should add blue', function () {
      convert('rgb(0, 0, 100) blue(+ 25)', 'rgb(0, 0, 125)');
    });

    it('should add blue by percentage', function () {
      convert('rgb(0, 0, 50) blue(+ 10%)', 'rgb(0, 0, 55)');
    });

    it('should subtract blue', function () {
      convert('rgb(0, 0, 50) blue(- 25)', 'rgb(0, 0, 25)');
    });

    it('should subtract blue by percentage', function () {
      convert('rgb(0, 0, 50) blue(- 10%)', 'rgb(0, 0, 45)');
    });

    it('should multiply blue', function () {
      convert('rgb(0, 0, 250) blue(* .1)', 'rgb(0, 0, 25)');
    });

    it('should multiply blue by percentage', function () {
      convert('rgb(0, 0, 250) blue(* 10%)', 'rgb(0, 0, 25)');
    });
  });

  describe('alpha', function () {
    it('should set alpha', function () {
      convert('black alpha(.5)', 'rgba(0, 0, 0, 0.5)');
    });

    it('should set alpha by percentage', function () {
      convert('black alpha(42%)', 'rgba(0, 0, 0, 0.42)');
    });

    it('should add alpha', function () {
      convert('rgba(0,0,0,0) alpha(+ .1)', 'rgba(0, 0, 0, 0.1)');
    });

    it('should add alpha by percentage', function () {
      convert('rgba(0,0,0,.5) alpha(+ 10%)', 'rgba(0, 0, 0, 0.55)');
    });

    it('should subtract alpha', function () {
      convert('black alpha(- .1)', 'rgba(0, 0, 0, 0.9)');
    });

    it('should subtract alpha by percentage', function () {
      convert('black alpha(- 10%)', 'rgba(0, 0, 0, 0.9)');
    });

    it('should multiply alpha', function () {
      convert('rgba(0,0,0,.2) alpha(* .5)', 'rgba(0, 0, 0, 0.1)');
    });

    it('should multiply alpha by percentage', function () {
      convert('rgba(0,0,0,.2) alpha(* 50%)', 'rgba(0, 0, 0, 0.1)');
    });
  });

  describe('hue', function () {
    it('should set hue', function () {
      convert('hsl(34, 50%, 50%) hue(25)', 'rgb(191, 117, 64)');
    });

    it('should set hue greater than 360', function () {
      convert('hsl(34, 50%, 50%) hue(385)', 'rgb(191, 117, 64)');
    });

    it('should set hue less than 360', function () {
      convert('hsl(34, 50%, 50%) hue(-369)', 'rgb(191, 117, 64)');
    });

    it('should add hue', function () {
      convert('hsl(10, 50%, 50%) hue(+ 15)', 'rgb(191, 117, 64)');
    });

    it('should subtract hue', function () {
      convert('hsl(40, 50%, 50%) hue(- 15)', 'rgb(191, 117, 64)');
    });

    it('should multiply hue', function () {
      convert('hsl(10, 50%, 50%) hue(* 2.5)', 'rgb(191, 117, 64)');
    });

    it('should adjust hue greater than 360', function () {
      convert('hsl(240, 50%, 50%) hue(+ 240)', 'rgb(64, 191, 64)');
    });

    it('should adjust negative hue', function () {
      convert('hsl(120, 50%, 50%) hue(- 240)', 'rgb(64, 64, 191)');
    });
  });

  describe('saturation', function () {
    it('should set saturation', function () {
      convert('hsl(25, 0%, 50%) saturation(50%)', 'rgb(191, 117, 64)');
    });

    it('should add saturation', function () {
      convert('hsl(25, 25%, 50%) saturation(+ 25%)', 'rgb(191, 117, 64)');
    });

    it('should substract saturation', function () {
      convert('hsl(25, 60%, 50%) saturation(- 10%)', 'rgb(191, 117, 64)');
    });

    it('should multiply saturation', function () {
      convert('hsl(25, 25%, 50%) saturation(* 2)', 'rgb(191, 117, 64)');
    });
  });

  describe('lightness', function () {
    it('should set lightness', function () {
      convert('hsl(25, 50%, 0%) lightness(50%)', 'rgb(191, 117, 64)');
    });

    it('should add lightness', function () {
      convert('hsl(25, 50%, 25%) lightness(+ 25%)', 'rgb(191, 117, 64)');
    });

    it('should substract lightness', function () {
      convert('hsl(25, 50%, 60%) lightness(- 10%)', 'rgb(191, 117, 64)');
    });

    it('should multiply lightness', function () {
      convert('hsl(25, 50%, 25%) lightness(* 2)', 'rgb(191, 117, 64)');
    });
  });

  describe('whiteness', function () {
    it('should set whiteness', function () {
      convert('hwb(0, 0%, 0%) whiteness(20%)', 'rgb(255, 51, 51)'); // hwb(0, 20%, 0%)
    });

    it('should add whiteness', function () {
      convert('hwb(0, 75%, 0%) whiteness(+25%)', 'rgb(255, 255, 255)'); // hwb(0, 100%, 0%)
    });

    it('should substract whiteness', function () {
      convert('hwb(0, 30%, 0%) whiteness(-10%)', 'rgb(255, 51, 51)'); // hwb(0, 20%, 0%)
    });

    it('should multiply whiteness', function () {
      convert('hwb(0, 50%, 0%) whiteness(*2)', 'rgb(255, 255, 255)'); // hwb(0, 100%, 0%)
    });
  });

  describe('blackness', function () {
    it('should set blackness', function () {
      convert('hwb(0, 0%, 0%) blackness(20%)', 'rgb(204, 0, 0)'); // hwb(0, 0%, 20%)
    });

    it('should add blackness', function () {
      convert('hwb(0, 0%, 75%) blackness(+25%)', 'rgb(0, 0, 0)'); // hwb(0, 0%, 100%)
    });

    it('should substract blackness', function () {
      convert('hwb(0, 0%, 30%) blackness(-10%)', 'rgb(204, 0, 0)'); // hwb(0, 0%, 20%)
    });

    it('should multiply blackness', function () {
      convert('hwb(0, 0%, 50%) blackness(*2)', 'rgb(0, 0, 0)'); // hwb(0, 0%, 100%)
    });
  });

  describe('blend', function () {
    it('should blend two colors', function () {
      convert('red blend(black 50%)', 'rgb(128, 0, 0)');
    });
  });

  describe('tint', function () {
    it('should blend a color with white', function () {
      convert('red tint(50%)', 'rgb(255, 128, 128)');
    });
  });

  describe('shade', function () {
    it('should blend a color with black', function () {
      convert('red shade(50%)', 'rgb(128, 0, 0)');
    });
  });

  describe('contrast', function () {
    it('should darken the same hue with a light color', function () {
      convert('hwb(180, 10%, 0%) contrast(0%)', 'rgb(13, 115, 115)'); // hwb(180, 5%, 55%)
    });

    it('should lighten the same hue with a dark color', function () {
      convert('hwb(0, 0%, 10%) contrast(0%)', 'rgb(252, 245, 245)'); // hwb(0, 96%, 1%)
    });

    it('should go to black with a light color', function () {
      convert('hwb(180, 10%, 0%) contrast(100%)', 'rgb(0, 0, 0)'); // hwb(180, 0%, 100%)
    });

    it('should go to white with a dark color', function () {
      convert('hwb(0, 0%, 10%) contrast(100%)', 'rgb(255, 255, 255)'); // hwb(0, 100%, 0%)
    });
  });

  describe('nested color functions', function () {
    it('should convert nested color functions', function () {
      convert('color(rebeccapurple a(-10%)) a(-10%)', 'rgba(102, 51, 153, 0.81)');
      convert('color(#4C5859 shade(25%)) blend(color(#4C5859 shade(40%)) 20%)', 'rgb(55, 63, 64)');
    });
  });

  describe('errors', function () {
    it('should throw an error is color is unknown', function () {
      assert.throws(function () {
        convert('wtf');
      }, /Unable to parse color from string/);
    });

    it('should throw an error is modifier is unknown', function () {
      assert.throws(function () {
        convert('red WTF(+10%)');
      }, /Unknown <color-adjuster>/);
    });
  });
});
