rgb
===

converts all sorts of colors to rgb format

basic usage
-----------

```js
var color = require("rgb")

color("hsl(50, 50, 50)") //'rgb(191,170,64)'
color("#000") //'rgb(0,0,0)'
color("hsl(50, 50, 50, 0.5)") //'rgba(191,170,64,0.5)'
color("maroon") //'rgb(128,0,0)'
color("#ff330033") //'rgba(255,51,0,0.2)'
```

matches
-------

```js
var color = require("rgb")

color.matches("#ff330033") //true
```

replace
-------

```js
var color = require("rgb")

color.replace("the color is #ff330033") //'the color is rgba(255,51,0,0.2)'

color.replace("the color is #ff330033", function(match){
    return color(match)
}) //'the color is rgba(255,51,0,0.2)'
```
