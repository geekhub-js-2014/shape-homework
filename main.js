/**
 * Created by mcfedr on 25/11/14.
 */
(function() {
    var hasAce = !!window.ace,
        messages = document.querySelector('#output'),
        editor = hasAce ? ace.edit("editor") : document.querySelector('#editor');

    hasAce && editor.getSession().setMode("ace/mode/javascript");

    function message(message) {
        messages.innerHTML += message + '\n';
    }

    function clear() {
        messages.innerHTML = '';
    }

    function assert(title, correct, valFunc) {
        var result,
            noCompare = !valFunc;
        if (noCompare) {
            valFunc = correct;
        }
        try {
            result = valFunc();
            message(title + ': ' + (noCompare || correct === result ? 'OK' : 'INCORRECT (' + result + ')'));
        }
        catch(e) {
            message(title + ': ' + ('ERROR'));
            console.error(title, e.message);
        }
        return result;
    }

    function run() {
        clear();
        var r = assert('Create rectangle', function() {
            return new Shapes.Rectangle(new Shapes.Point(0, 0), 10, 4);
        });
        assert('Rectangle area', 40, function() {
            return r.getArea();
        });
        assert('Rectangle perimeter', 28, function() {
            return r.getPerimeter();
        });
        assert('Rectangle count of points', 4, function() {
            return r.getPoints().length
        });

        var squareSize = Math.random() * 100;
        var s = assert('Create Square', function() {
            return  new Shapes.Square(new Shapes.Point(0, 0), squareSize);
        });
        assert('Square area', squareSize * squareSize, function() {
            return s.getArea();
        });
        assert('Square perimeter', squareSize * 4, function() {
            return s.getPerimeter();
        });
        assert('Square points count', 4, function() {
            return r.getPoints().length;
        });

        var circleSize = Math.random() * 100;
        var c = assert('Create Circle', function() {
            return new Shapes.Circle(new Shapes.Point(0, 0), circleSize);
        });
        assert('Circle area (this is sometimes incorrect because of rounding)', Math.PI * Math.pow(circleSize, 2), function() {
            return c.getArea();
        });
        assert('Circle cannot get points', undefined, function() {
            return c.getPoints;
        });

        var p = assert('Create Polygon', function() {
            return new Shapes.Polygon([
                new Shapes.Point(0, 0),
                new Shapes.Point(0, 1),
                new Shapes.Point(1, 1),
                new Shapes.Point(1, 0)
            ]);
        });
        assert('Polygon points', 4, function() {
            return p.getPoints().length;
        });
        assert('Polygon perimeter', 4, function() {
            return p.getPerimeter();
        });
        assert('Polygon center x', 0.5, function() {
            return p.getCenter().getX();
        });
        assert('Polygon center y', 0.5, function() {
            return p.getCenter().getY();
        });
    }

    document.querySelector('#run').addEventListener('click', function(e) {
        e.preventDefault();
        eval(hasAce ? editor.getValue() : editor.textContent);
        run();
    });
})();
