class Bomb {
    static radius = 30
    constructor({ position, velocity }) {
      this.position = position
      this.velocity = velocity
      this.radius = 0
      this.color = '#B100FF'
      this.opacity = 1
      this.active = false
  
      gsap.to(this, {
        radius: 30
      })
    }
  
    draw() {
      c.save()
      c.globalAlpha = this.opacity
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      c.closePath()
      c.fillStyle = this.color
      c.fill()
      c.restore()
    }
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  
      if (
        this.position.x + this.radius + this.velocity.x >= canvas.width ||
        this.position.x - this.radius + this.velocity.x <= 0
      ) {
        this.velocity.x = -this.velocity.x
      } else if (
        this.position.y + this.radius + this.velocity.y >= canvas.height ||
        this.position.y - this.radius + this.velocity.y <= 0
      )
        this.velocity.y = -this.velocity.y
    }
  
    explode() {
      audio.bomb.play()
      this.active = true
      this.velocity.x = 0
      this.velocity.y = 0
      gsap.to(this, {
        radius: 200,
        color: 'white'
      })
  
      gsap.to(this, {
        delay: 0.1,
        opacity: 0,
        duration: 0.15
      })
    }
  }
  
  class PowerUp {
    constructor({ position, velocity }) {
      this.position = position
      this.velocity = velocity
      this.radius = 40
  
      const image = new Image()
      image.src = './img/powerup.png'
      image.onload = () => {
        const scale = .75
        this.image = image
        this.width = image.width * scale
        this.height = image.height * scale
        this.position = {
          x: position.x,
          y: position.y
        }
      }
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }