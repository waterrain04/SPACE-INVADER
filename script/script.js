    const grid = document.querySelector('.grid')
    const resultsDisplay = document.querySelector('.results')
    const fire = document.querySelector('.fire');
    const start = document.getElementById("start")
    const pause = document.getElementById('pause')
    const restart = document.getElementById('restart')
    const how = document.querySelector('.how');
    const info = document.querySelector('.info');
    const x = document.querySelector('.x')
    let currentShooterIndex = 202
    let width = 15
    let direction = 1
    let invadersId
    let goingRight = true
    let aliensRemoved = []
    let results = 0

    for (let i = 0; i < 225; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
    }
    const squares = Array.from(document.querySelectorAll('.grid div'))
    const alienInvaders = [
      0,1,2,3,4,5,6,7,8,9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39
    ]
    function draw() {
      for (let i = 0; i < alienInvaders.length; i++) {
        if(!aliensRemoved.includes(i)) {
          squares[alienInvaders[i]].classList.add('invader')
        }
      }
    }

    draw()

    function remove() {
      for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
      }
    }
    squares[currentShooterIndex].classList.add('shooter')

    function moveShooter(e) {
      squares[currentShooterIndex].classList.remove('shooter')
      switch(e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
          if (currentShooterIndex % width !== 0) currentShooterIndex -=1
          break
        case 'd' :
        case 'D':
        case 'ArrowRight':
          if (currentShooterIndex % width < width -1) currentShooterIndex +=1
          break
      }
      squares[currentShooterIndex].classList.add('shooter')
    }

    function moveInvaders() {
      const leftEdge = alienInvaders[0] % width === 0
      const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
      remove()
      if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width +1
          direction = -1
          goingRight = false
        }
      }
      if(leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width -1
          direction = 1
          goingRight = true
        }
      }
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
      }
      draw()
      if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
        gameoverdiv()
        
    document.removeEventListener('keydown', shoot)
    document.removeEventListener('keydown', moveShooter)
      }
      for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length)) {
          resultsDisplay.innerHTML = 'GAME OVER'
          clearInterval(invadersId)
          gameoverdiv()
          
    document.removeEventListener('keydown', shoot)
    document.removeEventListener('keydown', moveShooter)
        }
      }
      if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId)
      }
    }
    function shoot(e) {

        document.getElementById('fire').play();
        let laserId
        let currentLaserIndex = currentShooterIndex
        function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
        if (squares[currentLaserIndex].classList.contains('invader')) 
        {
          document.getElementById('hit').play()
          squares[currentLaserIndex].classList.remove('laser')
          squares[currentLaserIndex].classList.remove('invader')
          squares[currentLaserIndex].classList.add('boom')
          setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
          clearInterval(laserId)
          const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
          aliensRemoved.push(alienRemoved)
          results++
          resultsDisplay.innerHTML = results
        }
      }
      switch(e.key) {
        case ' ':
          laserId = setInterval(moveLaser, 100)
      }
    }


    start.onclick =()=>{
    start.disabled=true;
    pause.disabled=false
    invadersId = setInterval(moveInvaders, 800)
    document.addEventListener('keydown', shoot)
    document.addEventListener('keydown', moveShooter)
    fire.style.display="none"
    start.classList.add("active");
    pause.classList.remove("active");
    document.getElementById('start').play(); 

    
  }

  pause.onclick =() =>{
    pause.disabled=true
    start.disabled=false
    clearInterval(invadersId)
    document.removeEventListener('keydown', shoot)
    document.removeEventListener('keydown', moveShooter)
    start.classList.remove("active")
    pause.classList.add("active")
    clearInterval(laserId)
  }

  restart.onclick = () =>{
    window.location.reload();
  }
  
function gameoverdiv(){
  fire.innerText =" GAME OVER!";
  fire.style.display = "block";

}
how.onclick = () =>{
  info.style.display="block";
}

x.onclick =()=>{
  info.style.display="none";
}