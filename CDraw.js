let CDrawf = {};    
let CDraw = {
    scope: this,
    a: null, b: null,
    init: function(a, b){
        CDraw.a = a; CDraw.b = b;
    },
    line: function(x, endX, y, endY, color="red", thick=1){
        [this.x, this.endX, this.y, this.endY, this.color,this.thick] =
        [x, endX, y, endY, color, thick];
        this.draw = ()=>{   
        CDraw.b.beginPath();     
        CDraw.drawStyle.lW(this.thick);
        CDraw.setColor("_"+this.color)
        CDraw.b.moveTo(this.x, this.y); 
        CDraw.b.lineTo(this.endX, this.endY); CDraw.b.stroke();    
        CDraw.b.closePath(); 
        }
    },
    sLine: function(x, lengthX, y, breadthY, color, thick){
        [this.x, this.lengthX, this.y, this.breadthY, this.color,this.thick] =
        [x, lengthX, y, breadthY, color, thick];
        this.endX = this.x+this.lengthX; this.endY = this.y+this.breadthY
        this.draw = ()=>{
        CDraw.b.beginPath();     
        CDraw.drawStyle.lW(this.thick);
        CDraw.setColor("_"+this.color)
        CDraw.b.moveTo(this.x, this.y); 
        CDraw.b.lineTo(this.endX, this.endY); CDraw.b.stroke();    
        CDraw.b.closePath();
        }
    },
    arc: function(x, y, r, start, end, color){
        this.x = x; this.y = y, this.radius = r; this.start= start;
        this.end = end; this.color = color; this.type = "arc";
        var draw = ()=>{
            //console.info("Drawing: arc")
            CDraw.b.beginPath();
            CDraw.b.arc(this.x, this.y, this.radius, this.start, this.end);
            CDraw.setColor(this.color);
            CDraw.b.closePath();
        }
        this.draw = draw;
   },
    rect: function( x, lengthX, y, breadthY,color ){
        this.x = x;   this.lengthX = lengthX;
        this.y = y;   this.breadthY = breadthY;
        this.color = color;
        this.draw = ()=>{
            CDraw.b.beginPath();
            CDraw.setColor(this.color)
            CDraw.b.fillRect(this.x, this.y, this.lengthX, this.breadthY );
            CDraw.b.closePath();
        }
    },
   setColor: function(color){
        if(typeof color == "string" && color.length > 0) {
            if(color[0] == "_"  ){
                CDraw.b.strokeStyle = color.replace("_", "");   
                CDraw.b.stroke(); }
            else { CDraw.b.fillStyle = color; CDraw.b.fill(); }
        }
        if(typeof color == "object"){
            if(color[0] == "_"  ){  
                CDraw.b.strokeStyle = color[1];   
                CDraw.b.stroke(); 
            }
            else { 
                CDraw.b.fillStyle = color[1];
                CDraw.b.fill(); 
            }
        }//EO typeof 
   },
   drawStyle: {
         lW: function(lW){     CDraw.b.lineWidth = lW;   },
         gA: function(gAfa =1 ){     CDraw.b.globalAlpha = gAfa;  },
         lC: function(lC){   CDraw.b.lineCap = ""+lC;       },
         tA: function(tA){   CDraw.b.textAlign = tA ;      },
         tB: function(tB){   CDraw.b.textBaseline = tB;    }
    },
   clearCanvas: function(){
       CDraw.b.clearRect(0, 0, CDraw.a.width, CDraw.a.height)
   },
   setCanvasStyle: function(a, settings){
        if(settings.type == "fill"){
            a.width = window.innerWidth;
            a.height = window.innerHeight;
            //a.width = window.screen.width;
            //a.height = window.screen.height;
        }

        a.style.position = settings.position;
        if(settings.pinToTop && a.style.position == "absolute"){
            a.style.top = 0+"%";
            a.style.left = 0+"%";
        }
        if(settings.pinToTop && a.style.position == "static"){
            a.style.marginLeft = 0;
            a.style.marginTop = 0;
        }
    },
   useScene: function(){ 
        this.allChildren = [];
        let animFrame = ()=>{
            CDraw.clearCanvas(); 
            this.allChildren.map((child) =>{ 
                child.draw();
            });
        requestAnimationFrame(animFrame)
        //console.log("all", this.allChildren)
        }
        animFrame();
        this.add = (child)=>{
            child.indexInScene = this.allChildren.length
            this.allChildren.push(child);
            //console.log("add")
        }
        this.remove = (child)=>{
            this.allChildren.splice(child.indexInScene, 1);
        }
   }//EO useScene
   
   
}//EO CDraw
        
        
        
      
