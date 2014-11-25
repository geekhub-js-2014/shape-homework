/**
 Треба створити конструктори:

 фігура:
 координати:
 х,
 у

 багатокутник -> фігура:
 вершини[координати],
 периметр()

 прямокутник -> багатокутник:
 довжина,
 висота,
 площа(),
 периметр()

 квадрат -> прямокутник:
 довжинаСторони,
 площа(),
 периметр()

 трикутник -> фігура:
 площа(),
 периметр()

 круг -> фігура:
 радіус,
 площа(),
 периметр()

 з яких можна створювати обєкти, і дізнаватися їхню площу і периметр.
 Сподіваюсь ви розбкрктксь в наших позначках, там має бути все зрозуміло,
 використовуйте спадкування. Скоро Фред зробить під це завдання тести,
 і ви зможите подивитись назви і сігнатури всіх методів, і якщо зараз не
 все зрозуміло то буде зрозуміліше згодом. Робити "можна" починати зараз,
 питання також можна задавати зараз.﻿
 **/
function Shape(center) {
    this.getCenter = function() {
        return center;
    };
}

function Polygon(points) {
    var xTotal = 0,
        yTotal = 0,
        count = 0;
    points.forEach(function(point) {
        xTotal += point.getX();
        yTotal += point.getY();
        count++;
    });

    Shape.apply(this, [new Point(xTotal / count, yTotal / count)]);
    this.getPoints = function() {
        return points;
    };
}
Polygon.prototype = Object.create(Shape.prototype);
Polygon.prototype.getPerimeter = function() {
    return this.getPoints().reduce(function(m, point, idx, points) {
        return m + point.getDistance(points[Math.abs(idx - 1 % points.length)]);
    }, 0);
};

function Rectangle(center, width, height) {
    var points = [
        center.getPointAtOffset(-width / 2, -height / 2),
        center.getPointAtOffset(width / 2, -height / 2),
        center.getPointAtOffset(width / 2, height / 2),
        center.getPointAtOffset(-width / 2, height / 2)
    ];
    Polygon.apply(this, [points]);

    this.getWidth = function() {
        return width;
    };
    this.getHeight = function() {
        return height;
    };
}
Rectangle.prototype = Object.create(Polygon.prototype);
Rectangle.prototype.getArea = function() {
    return this.getWidth() * this.getHeight();
};
Rectangle.prototype.getPerimeter = function() {
    return 2 * this.getHeight() + 2 * this.getWidth();
};

function Square(center, width) {
    Rectangle.apply(this, [center, width, width]);
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.getPerimeter = function() {
    return 4 * this.getWidth();
};

function Circle(center, radius) {
    Shape.apply(this, [center]);
    this.getRadius = function() {
        return radius;
    }
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.getArea = function() {
    return Math.PI * this.getRadius() * this.getRadius();
};
Circle.prototype.getPerimeter = function() {
    return 2 * Math.PI * this.getRadius();
};

function Point(x, y) {
    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
}
Point.prototype.getPointAtOffset = function(x, y) {
    return new Point(this.getX() + x, this.getY() + y);
};
Point.prototype.getDistance = function(point) {
    return Math.sqrt(Math.pow(this.getX() - point.getX(), 2) + Math.pow(this.getY() - point.getY(), 2));
};

Shapes = {
    Shape: Shape,
    Polygon: Polygon,
    Rectangle: Rectangle,
    Square: Square,
    Circle: Circle,
    Point: Point
};
