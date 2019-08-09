var s, food, score = 0;

function createFood() {    
    food = createVector(floor(random(30)), floor(random(30)));
    food.mult(20);
    for (let i = 0; i < s.tail.length; i++) {
        if (s.tail[i].x == food.x && s.tail[i].y == food.y) {
            console.log('trung...');
            createFood();
        };
    };    
}; 

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    createFood();
};

function draw() {
    background(1, 123, 123)
    s.dead();    
    s.update();
    if (s.eat(food)) {
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;        
        createFood();
    };
        
    s.show();    
    fill(7, 255, 150);
    rect(food.x, food.y, 20, 20)
};

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xdir = 0;
    this.ydir = 0;
    this.tail = [];
    this.total = 0;

    this.eat = function (food) {
        var d = dist(this.x, this.y, food.x, food.y)        
        if (d == 0) {
            this.total++;
            return true;
        }
        else {
            return false;
        };
    };

    this.dead = function () {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
                alert('You lose... Say goodbye!!!')
                this.x = 0;
                this.y = 0;
                this.xdir = 0;
                this, ydir = 0;
                this.tail = [];
                this.total = 0;
                score = 0;
                document.getElementById('score').innerHTML = 'Score: 0';
            };
        };

    };

    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        };

        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y,);            
        };

        this.x = this.x + this.xdir * 20;
        this.y = this.y + this.ydir * 20;

        this.x = constrain(this.x, 0, 580);
        this.y = constrain(this.y, 0, 580);

    };

    this.show = function () {
        fill(255)
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, 20, 20);
        };

        rect(this.x, this.y, 20, 20)
    };

    this.dir = function (x, y) {
        if (this.xdir != -x) {
            this.xdir = x;
        };
        if (this.ydir != -y) {
            this.ydir = y;
        };
    };
};