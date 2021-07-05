
CDrawf.Fondo = 
    function(container = null, canvasStyle={fillContainer: true}){
    
    var a = document.createElement("canvas");
    this.canvas = a;
    var b = a.getContext("2d");
    new CDraw.init(a, b);//now useless
    
    
    
    container.prepend(a);
    a.style.position = "absolute";
    if(canvasStyle.fillContainer){    
        CDraw.setCanvasStyle(a, {
            type: "fill", alpha: 0, position: "absolute", pinToTop: true
        });
    }
    
    
    
    
this.dotsConnect = function(changes={}){    
    let settings = {    
    bgColor: "blue",
    dotsColor: "rgba(250, 250, 250, 0.5)",  linesColor: "white",
    dotsCount: 20, dotsAlpha: 0.8, dotRadius: 10, uniformRadius: false,
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
    let scene = new CDraw.useScene(b);
    
    
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_"+settings.bgColor);
    scene.add(bgRect); 
    
    settings.dotsLength = Math.floor( 5+CR/50*settings.dotsCount ); 
    let dots = new Array(settings.dotsLength);
    for(let ind=0; dots.length>ind; ind++){
        if(settings.dotsShape == "circle"){
        dots[ind] = new CDraw.arc(
            CW/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CH/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9),
            CR/3000*
            (settings.dotRadius+settings.dotRadius/MHelp.randOpt(-2,+2,+2.5)),
            0, 6.3,
            "_"+settings.dotsColor
        );
        }
        if(settings.dotsShape == "square"){
        dots[ind] = new CDraw.rect(
            CW/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9)-settings.dotRadius,
            CR/3000*settings.dotRadius*2,
            CH/10*MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9)-settings.dotRadius,
            CR/3000*settings.dotRadius*2,
            "_"+settings.dotsColor
            );
        }
        dots[ind].moveDir=MHelp.randOpt(30, 60, 120, 150, 210, 240, 300, 330);
        dots[ind].modus =  dots[ind].moveDir+Math.random()*360;
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
            joiner.draw(b);
            }
        })//EO dots.closests
        
        
        dot.x += 
        Math.cos(Math.PI/360*dot.moveDir)*MHelp.signelta(dot.modus, 360);
        dot.y += 
        Math.sin(Math.PI/360*dot.moveDir)*MHelp.signelta(dot.modus, 360);
        dot.moveDir += 0+Math.random()*0.2;
        dot.modus += 0.8+Math.random()*0.2;
        if(dot.x == CW*0.333||dot.x == 0 || dot.y==0 || dot.y == CH*0.333)dot.moveDir *= -1; 
        
    });
        
        
    requestAnimationFrame(updateFrame)
    }//EO updateFrame
    
    
    
    
    this.settings = settings;  
}//EO dotsConnect
    
    
    
    
    
    
    
    
this.sizzleText = function(changes={}){
    
    let settings = {
    text: "sizzle Text",
    bgColor: "blue",
    dotsColor: "rgba(250, 50, 100, 0.5)",
    textPosition: "middle"
    }
    for (var prop in changes) {
        if (changes.hasOwnProperty(prop)) { settings[prop] = changes[prop]; }
    }
    
    
    let CW = a.width//= 300;
    let CH = a.height//= 300;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b);
    
    
    
    
    let fontSize = CR/450*28;
    switch (settings.textPosition){
        case 'middle':
    sizzledText = 
    new CDraw.text("bold +*"+fontSize+"pt arial", settings.text, CW/2, CH/2, "_white", 1000);  
        break;//middle

        case 'left':
    sizzledText = 
    new CDraw.text("bold *"+fontSize+"pt arial", settings.text, 0, CH/2, "_white", 1000);  
        break;//left
        
        case 'right':
    sizzledText =
    new CDraw.text("bold ++*"+fontSize+"pt arial", settings.text, CW, CH/2, "_white", 1000);  
        break;//right
        
        case 'top':
    sizzledText =
    new CDraw.text("bold +"+fontSize+"pt arial", settings.text, CW/2, 0, "_white", 1000);  
        break;//top
        
        case 'bottom':
    sizzledText =
    new CDraw.text("bold +**"+fontSize+"pt arial", settings.text, CW/2, CH, "_white", 1000); //bug with textBaseline--middle;
        break;//bottom
        
        default:
        settings.textPosition = "middle";
    sizzledText = 
    new CDraw.text("bold +*"+fontSize+"pt arial", settings.text, CW/2, CH/2, "_white", 1000);  
        //middle
    }
    scene.add(sizzledText);
    
    
    
    
    let randomParticles = [];
    
    setTimeout(function() {
    scene.getOpaquePixels(scene.B, 0, CW, 0, CH, function(oPixelPosition){
    scene.remove(sizzledText);
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_"+settings.bgColor);
    scene.add(bgRect); 
    oPixelPosition.map((val, ind)=>{
        var randmity = 1-590/oPixelPosition.length;
        var dispersionX = 30*CH/300;
        if(Math.random()> randmity){
        var particle = new CDraw.arc(
            val.x-dispersionX+Math.random()*dispersionX,
            CH/(1.5-Math.random()*0.5),
            CR/3000*(4+4/MHelp.randOpt(-2,+2,+2.5)),
            0, 6.3,
            "_"+settings.dotsColor);
        particle.destination = {x: val.x, y: val.y};
        particle.speed = (0.4+Math.random()*0.5)*CR/450;
        scene.add(particle);
        randomParticles.push(particle);
        }
    });
    update();   
    })
    }, 100);
    
    
    
    function update(){
        randomParticles.map((particle, particleInd)=>{
            if(particle.x<particle.destination.x){  
                particle.x+=particle.speed/4;    }
            if(particle.x>particle.destination.x){  
                particle.x-=particle.speed/4;    }
            if(particle.y<particle.destination.y){  
                particle.y+=particle.speed;    }
            if(particle.y>particle.destination.y){  
                particle.y-=particle.speed;    }
        });
        
    requestAnimationFrame(update)
    }//EO update
    
    
    
}   //EO sizzleText
    
    
    
    
    
    
    
this.movingRects = function(changes={}){
    let settings = {
        direction: "left",
        bgColor: "rgba(0, 0, 0, 0)"
    }
    for(var prop in changes) {
        if(changes.hasOwnProperty(prop)) { settings[prop] = changes[prop]; }
    }
    
    
    let CW = a.width//= 300;
    let CH = a.height//= 300;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b);
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_"+settings.bgColor);
    scene.add(bgRect); 
    let mRects = [];
    update();
    
    
    
    
    function update(){
    if(mRects.length < 15){
        let mRectX = CW+(CW/10*MHelp.randOpt(6, 8, 9));
        let mRectY = CH/10*(MHelp.randOpt(1, 2, 3, 4, 5, 6, 7, 8, 9));
        let mRect = new CDraw.sLine(
            mRectX,
            (CW/10*MHelp.randOpt(1, 2, 3, 4, 5)),
            mRectY,
            0,
            MHelp.randOpt("rgba(200, 20, 50, 0.8)", "rgba(70, 80, 150, 0.8)", "rgba(150, 200, 150, 0.8)", "rgba(170, 220, 150, 0.8)" ),
            CH/30*MHelp.randOpt(1, 2, 3, 4, 5));
            
        mRects.push(mRect);
    }
    mRects.map((mRect, mRectInd)=>{
        mRect.x -= mRect.lengthX/100;
        mRect.draw(scene.B);
        if(mRect.x+mRect.lengthX < -10){    mRects.splice(mRectInd, 1);   }
    })
    requestAnimationFrame(update)
    }//EO update
    
    
}//EO movingRects
    
    
    
    
    
    
    
    
    
    
    
}//EO CDrawf.Fondo
