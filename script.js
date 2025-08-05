(() =>{
    //เริ่มเขียนโค้ด
  function setup(){
        const canvas = document.getElementById('falling-snow-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
    return {
        canvas,
        canvasContext: canvas.getContext('2d'),
        numberOfSnowBalls:250
    }
  }
  function random(min, max){
      return Math.floor(Math.random()*(max - min + 1))+min;


   }

    function createSnowBalls(canvas, numberOfSnowBalls) {
      return [...Array(numberOfSnowBalls)].map(() =>{
        return {
            x: random(0, canvas.width),
            y:random(0,canvas.height),
            opacity: random(0.5,1),
            radius: random(2,4), //ความใหญ่ของลูก
            speedX: random(-5,5), //บางลูกตกทางขวา ตกมาแล้วเลื่อนไปทางซ้าย
            speedY: random(1,3) //ไม่ติดตลบคือ ไม่ให้มันเลื่อนขึ้น ให้มันลง
        }
    });
    }
  
  function drawSnowBall(canvasContext, snowBall){
    canvasContext.beginPath();
    canvasContext.arc(snowBall.x,snowBall.y,snowBall.radius,0,Math.PI*2);
    canvasContext.fillStyle = `rgba(255,255,255,${snowBall.opacity})`;
    canvasContext.fill();
  }

    function moveSnowBall(canvas,snowBall){
        snowBall.x += snowBall.speedX; //ความเร็วของลูกหิมะบนล่างซ้ายขวา
        snowBall.y += snowBall.speedY;
        //สร้างเงื่อนไข
        if (snowBall.x > canvas.width){ //พอมันเลื่อนขวาลงไปจนตกขอบด้านล่าง ก็ให้มันรีเซ็ตใหม่0 ไปขอบซ้าย
            snowBall.x = 0;
        } else if (snowBall.x < 0) { //น้อยกว่าศูนย์คือตกด้านซ้าย ก้ไปทะลุด้านขวา
            snowBall.x = canvas.width;
        }

        if(snowBall.y > canvas.height){ //พอมันเลื่อนลงมาจากบนลงล่างและตกขอบก็ให้รีเซ็ตใหม่จากด้านบน
            snowBall.y = 0;
        }
        
    }
    function run(){
        const{ canvas, canvasContext, numberOfSnowBalls}=setup();
        const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);

       setInterval(() =>{ //เพื่อให้มันขยับทุกๆวิหรือนาที ในส่วนนี้คือ 50วินาที วนซ้ำเรื่อยๆ
        canvasContext.clearRect(0,0,canvas.width,canvas.height); //ทำให้มันลบของเก่าออกและเคลื่อนไหวต่อแบบไม่ลากเป็นเส้นยาว
        snowBalls.forEach((snowBall)=>drawSnowBall(canvasContext, snowBall));
        snowBalls.forEach((snowBall)=>moveSnowBall(canvas,snowBall));
    }, 50)
   }
        
    run();
})();
