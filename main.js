function Ball(element) {  
    this.element = element;  
    this.x = Math.random() * (window.innerWidth - 50);  
    this.y = Math.random() * (window.innerHeight - 50);  
    this.vx = (Math.random() - 0.5) * 8; // 随机水平速度  
    this.vy = (Math.random() - 0.5) * 8; // 随机垂直速度  
    this.bounceFactor = 1; // 反弹系数设置为1，确保完全反弹  
    
    this.element.style.left = this.x + 'px';  
    this.element.style.top = this.y + 'px';  
    this.element.style.backgroundColor = this.getRandomColor();  
  }  
    
  Ball.prototype.getRandomColor = function() {  
    var letters = '0123456789ABCDEF';  
    var color = '#';  
    for (var i = 0; i < 6; i++) {  
      color += letters[Math.floor(Math.random() * 16)];  
    }  
    return color;  
  };  
    
  Ball.prototype.update = function() {  
    // 更新小球位置  
    this.x += this.vx;  
    this.y += this.vy;  
    
    // 检测边界碰撞  
    if (this.y + 50 >= window.innerHeight) {  
      this.y = window.innerHeight - 50;  
      this.vy = -this.vy * this.bounceFactor; // 完全反弹  
    } else if (this.y <= 0) {  
      this.y = 0;  
      this.vy = -this.vy;  
    }  
    
    if (this.x + 50 >= window.innerWidth) {  
      this.x = window.innerWidth - 50;  
      this.vx = -this.vx;  
    } else if (this.x <= 0) {  
      this.x = 0;  
      this.vx = -this.vx;  
    }  
    
    // 更新小球样式  
    this.element.style.left = this.x + 'px';  
    this.element.style.top = this.y + 'px';  
  };  
    
  var balls = [];  
  var devilCircle = document.getElementById('devilCircle');  
  var circleX = window.innerWidth / 2 - 50; // 恶魔圈初始X位置（中心-半径）  
  var circleY = window.innerHeight / 2 - 50; // 恶魔圈初始Y位置（中心-半径）  
  var circleSpeed = 5; // 恶魔圈移动速度  
  
  function createBalls(numberOfBalls) {  
    for (var i = 0; i < numberOfBalls; i++) {  
      var ballElement = document.createElement('div');  
      ballElement.className = 'ball';  
      document.body.appendChild(ballElement);  
      var ball = new Ball(ballElement);  
      balls.push(ball);  
    }  
  }  
  
  function moveDevilCircle(event) {  
    if (event.type === 'keydown') {  
      if (event.key === 'ArrowUp') {  
        circleY -= circleSpeed;  
      } else if (event.key === 'ArrowDown') {  
        circleY += circleSpeed;  
      } else if (event.key === 'ArrowLeft') {  
        circleX -= circleSpeed;  
      } else if (event.key === 'ArrowRight') {  
        circleX += circleSpeed;  
      }  
    } else if (event.type === 'mousemove') {  
      circleX = event.clientX - 50; // 鼠标X位置-半径  
      circleY = event.clientY - 50; // 鼠标Y位置-半径  
    }  
  
    // 限制恶魔圈在窗口内  
    if (circleX < 0) circleX = 0;  
    if (circleX > window.innerWidth - 100) circleX = window.innerWidth - 100;  
    if (circleY < 0) circleY = 0;  
    if (circleY > window.innerHeight - 100) circleY = window.innerHeight - 100;  
  
    devilCircle.style.left = circleX + 'px';  
    devilCircle.style.top = circleY + 'px';  
  }  
  
  function checkCollision() {  
    balls = balls.filter(ball => {  
      var ballRect = ball.element.getBoundingClientRect();  
      var circleRect = devilCircle.getBoundingClientRect();  
  
      // 检查是否碰撞  
      if (  
        ballRect.left < circleRect.right &&  
        ballRect.right > circleRect.left &&  
        ballRect.top < circleRect.bottom &&  
        ballRect.bottom > circleRect.top  
      ) {  
        ball.element.remove(); // 吃掉弹球  
        return false; // 从数组中移除  
      }  
      return true;  
    });  
  }  
  
  function animate() {  
    balls.forEach(ball => ball.update());  
    checkCollision();  
    requestAnimationFrame(animate);  
  }  
  
  createBalls(100); // 创建100个小球  
  animate();  
  
  // 添加键盘和鼠标事件监听器  
  window.addEventListener('keydown', moveDevilCircle);  
  window.addEventListener('mousemove', moveDevilCircle);