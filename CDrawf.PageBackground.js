
CDrawf.PageBackground =  function(a=null){
    if (a == null){
    a = document.createElement("canvas");
    document.body.appendChild(a);
    }
    const b = a.getContext("2d");
    new CDraw.init(a, b);
    CDraw.setCanvasStyle(a, {type: "fill", alpha: 0, position: "absolute", pinToTop: true});
    
    
    
    
this.canvasObj = a;
this.dotsConnect = function(changes={}){
    
    let settings = {    
    pageColor: "blue",
    dotsColor: "rgba(250, 250, 250, 0.5)",  linesColor: "white",
    dotsLength: 20, dotsAlpha: 0.8, dotRadius: 10, uniformRadius: false,
    dotsShape: "circle"
    }
    for (var prop in changes) {
        if (changes.hasOwnProperty(prop)) { settings[prop] = changes[prop]; }
    }
    if(settings.dotsShape != "square" && settings.dotsShape != "circle"){
        settings.dotsShape = "circle"
    }
    
    
    let CW = a.width;
    let CH = a.height;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene();
    
    
    let bgRect = new CDraw.rect(0, CW, 0, CH, settings.pageColor);
    scene.add(bgRect); 
    
    
    let dots = new Array(settings.dotsLength);
    for(let ind=0; dots.length>ind; ind++){
        if(settings.dotsShape == "circle"){
        dots[ind] = new CDraw.arc(
            CW/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CH/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CR/3000*(settings.dotRadius+MHelp.randOpt(-5, +5, +10)),
            0, 6.3,
            settings.dotsColor
        );
        }
        if(settings.dotsShape == "square"){
        dots[ind] = new CDraw.rect(
            CW/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9)-settings.dotRadius,
            CR/3000*settings.dotRadius*2,
            CH/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9)-settings.dotRadius,
            CR/3000*settings.dotRadius*2,
            settings.dotsColor
            );
        }
        dots[ind].moveDir=MHelp.randOpt(30, 60, 120, 150, 210, 240, 300, 330);
        dots[ind].modus = 0
        scene.add(dots[ind]);
        
    }
    updateFrame(); 
    
    
    
    
    
    function updateFrame(){
    dots.map((dot, ind)=>{
        dot.closests = []
        dots.map((others, othersInd)=>{
            let resultant = MHelp.resultantOf(dot.x-others.x, dot.y-others.y) 
            dot.closests.push({x: others.x, y: others.y,resultant: resultant})
        })
        dot.closests.sort((a, b)=>{
            return a.resultant - b.resultant;
        });
        
        dot.closests.map((closest, closestInd)=>{
            let closeLimit = CR*0.00033*300
            if(closest.resultant <closeLimit){
            let joiner= new CDraw.line(dot.x, closest.x, dot.y, closest.y,
            settings.linesColor, 1.2*(1-closest.resultant/closeLimit) );
            joiner.draw();
            }
        })//EO dots.closests
        

        dot.x += 
        Math.cos(Math.PI/360*dot.moveDir)*cycleNorm(dot.modus, CW*0.33);
        dot.y += 
        Math.sin(Math.PI/360*dot.moveDir)*cycleNorm(dot.modus, CH*0.33);
        dot.moveDir += 0+Math.random()*0.2;
        dot.modus += 0.8+Math.random()*0.2;
        if(dot.x == CW*0.333 || dot.x == 0 || dot.y==0 || dot.y == CH*0.333)dot.moveDir *= -1; 
        
    });
        
        
    requestAnimationFrame(updateFrame)
    }//EO updateFrame
    
    
    
    
    
    this.settings = settings
}//EO dotsConnect
    
    
    
this.bubbles = function(changes={}){
    
    let settings = {    
    pageColor: "blue",
    dotsColor: "rgba(250, 250, 250, 0.5)",  linesColor: "white",
    dotsLength: 20, dotsAlpha: 0.8, dotRadius: 10, uniformRadius: false}
    for (var prop in changes) {
        if (changes.hasOwnProperty(prop)) { settings[prop] = changes[prop]; }
    }
    
    let CW = a.width;
    let CH = a.height;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene();
    
    
    let bgRect = new CDraw.rect(0, CW, 0, CH, settings.pageColor);
    scene.add(bgRect); 
    
    
    let dots = new Array(settings.dotsLength);
    for(let ind=0; dots.length>ind; ind++){ 
        dots[ind] = new CDraw.arc(
            CW/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CH/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CR/3000*MHelp.randOpt(5, 15, 10, 20),
            0, 6.3,
            settings.dotsColor );
        dots[ind].moveDir= MHelp.randOpt(30, 60, 120, 150, 210, 240, 300, 330);
        dots[ind].modus = 0
        scene.add(dots[ind]);
        
    }
    
    updateFrame(); 
    function updateFrame(){
    
    
    dots.map((dot, ind)=>{
        dot.closests = []
        dots.map((others, othersInd)=>{
            let resultant = MHelp.resultantOf(dot.x-others.x, dot.y-others.y) 
            dot.closests.push({x: others.x, y: others.y,resultant: resultant})
        })
        dot.closests.sort((a, b)=>{
            return a.resultant - b.resultant;
        });
        
        dot.closests.map((closest, closestInd)=>{
            let closeLimit = CR*0.00033*300
            if(closest.resultant <closeLimit){
            let joiner= new CDraw.line(dot.x, closest.x, dot.y, closest.y,
            settings.linesColor, 1.2*(1-closest.resultant/closeLimit) );
            joiner.draw();
            }
        })//EO dots.closests
        

        dot.x += 
        Math.cos(Math.PI/360*dot.moveDir)*cycleNorm(dot.modus, CW/0.33);
        dot.y += 
        Math.sin(Math.PI/360*dot.moveDir)*cycleNorm(dot.modus, CH/0.33);
        dot.moveDir += 0+Math.random()*0.2;
        dot.modus += 0.8+Math.random()*0.2;
        if(dot.x == CW*0.333 || dot.x == 0 || dot.y==0 || dot.y == CH*0.333)dot.moveDir *= -1; 
        
    });
        
        
        
        
        
    requestAnimationFrame(updateFrame)
    }//EO updateFrame
    
    
    this.settings = settings
}//EO dotsConnect
    
    
    
    
    
    
    
    
    
function cycleNorm (angle, limit){
    return (1- 2*(Math.floor(angle/limit)%2));
}
cycleNorm(500)
    
    
    
    
    
    this.rrr = 3;
}//EO CDrawf.PageBackground
