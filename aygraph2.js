     console.warn("see --CDraw.js")
     
     var a; var b;
     var pageLogElement;
     function declare(a1, b1){
        a = a1;
        b = b1;
        this.fillRect = function(x,X,y,Y,color){
            b.beginPath(); fST(color);
            b.fillRect(x, y, X, Y); 
            b.fill();
            b.closePath(); 
        }
     
        pageLogElement = document.createElement("p");
        
     }//EO declare 
      
      
      
      
      
      //logger
      function pageLogger(){
          
          return {
              log: function(string, index){
                    /*        if(! CLS("class", "logger"+index) ){
                  var eachLogElement = document.createElement("p"); 
                 var eachLogElement.setAttribute("class", "loggers");
                  var theElement = CLS("loggers", index);
                  pageLogElement.appendChild(eachLogElement);
                              }
                  CLS("loggers", index).innerHTML = string;  */
    
                                         }
                 }
      }
    
    
    
    
    
    
    
    
    
    
    
    ///  designd
    function sST(color){ b.strokeStyle = color; }
    function fST(color){ b.fillStyle = color; }
    function makeCol(color){
        if(typeof color == "string" && color.length > 0) {
            if(color[0] == "."  ){
                b.strokeStyle = color.replace(".", "");   b.stroke(); }
            else { b.fillStyle = color; b.fill(); }
                            }
            if(color.length < 1){      b.strokeStyle = color[0]; b.stroke();  } 
	}//EO checkcol
    
    
    
          var txt = function(fonter, text, x, y, sOrFill=0, maxW =309000){
                        var sOrFill;
          //console.log("Oct:8:2020: replaced '.' with '$' ")
                        var font = fonter.replace( "$", " " ).replace("#", " ");
                            if( fonter.indexOf("$") != -1) {  b.textAlign = "center";         }
                            if( fonter.indexOf("#") != -1) {  b.textBaseline =  "middle";   }
                        b.font = font;
                        if(sOrFill == 0)    { b.fillText(text, x ,y, maxW); }
                        if(sOrFill != 0)    { style.w(sOrFill);  b.strokeText(text, x ,y, maxW); }
          }
        
        
        
        
        
                
    
   
                 function singleL(x,X,y,Y,color,thick){  
    b.beginPath();     style.w(thick);  sST(color);
    b.moveTo(x,y); 
    b.lineTo(X+x,y+Y); b.stroke();    b.closePath(); 
                 }
    
  
                  
    var arc = {
    m: function(x, y, r, start, end,color){
            b.beginPath();
            b.arc(x, y, r, start, end); 
            makeCol(color);
            b.closePath();
            return {    
                 checkBound: function(callback){
                    callback(x, y)
                }
                  }
   }   }
      
      var rect = function( x,X,y,Y,color ){
                           b.beginPath(); 
                  if(color[0] == "."  )  {   b.strokeStyle = color.slice(1); 
                                             b.strokeRect(x, y, X, Y);
                                             b.stroke();            }
                  else { b.fillStyle = color;  b.fillRect(x, y, X, Y );
                         b.fill(); }
                  b.closePath(); 
         }
    
       var clear = function( x=0, y=0, X=a.width, Y=a.height){  b.clearRect(x,y,X,Y);       }
    
    
    
function ellip(startX, startY, width, height,col ,angle=1){
            var degK = -1; var degK2 = 0;
          var width = width//*Math.sin(toDeg(90));
          var height = height//*Math.sin(toDeg(90));
          var cW = startX+width; 
          var cH = startY;
          var cWMid =startX+(width/2);
          var cHMid = startY+(height);
          
          
          b.beginPath();
          b.moveTo(startX, startY);
          b.quadraticCurveTo(cWMid, cHMid, cW, cH);
          makeCol(col)
          b.closePath()
    }
function ellipBez(startX, startY, width, height,col, angle){
          var width = width//*Math.sin(toDeg(90));
          var height = height//*Math.sin(toDeg(90));
          var cW = startX+width; 
          var cH = startY+height;
          var cWMid =startX+(width/2);
          var cHMid = startY-(height);
         
          b.beginPath();
          b.moveTo(startX, startY);
          b.bezierCurveTo(startX, cH, cW, cH, cW, startY);
          makeCol(col)
          b.closePath()
    }



    var paths = {
        roundRect: function(x,width, y ,height,col,radius) {
 b.beginPath();
 b.moveTo(x + radius, y);
 b.lineTo(x + width - radius, y);
 b.quadraticCurveTo(x + width, y, x + width, y + radius);
 b.lineTo(x + width, y + height - radius);
 b.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
 b.lineTo(x + radius, y + height);
 b.quadraticCurveTo(x, y + height, x, y + height - radius);
 b.lineTo(x, y + radius);
 b.quadraticCurveTo(x, y, x + radius, y);
 makeCol(col)
 b.closePath();
                                                    },
         polygon: function(nOfSides,centerX,centerY, rad,col,rotationRadians){
 var angles=Math.PI*2/nOfSides;
 b.translate(centerX,centerY);
 b.rotate(rotationRadians);
 b.beginPath();
 b.moveTo(rad,0);
             for(var i=1;i<nOfSides;i++){
       b.rotate(angles);
       b.lineTo(rad,0);
             }
 b.closePath();
 makeCol(col)
 b.rotate(angles*-(nOfSides-1));
 b.rotate(-rotationRadians);
 b.translate(-centerX,-centerY);
}
                                                    
    }
    
    
    
    
    
    
    
    
    
    
    
    var shadow = {
        m: function(x, y, color, blur){   b.shadowColor = color; 
        b.shadowOffsetX = x; b.shadowOffsetY = y; b.shadowBlur = blur; },
        r: function(){ this.m( 0, 0, "rgba('0,0,0,0')", 0);  }
                  }
                  
                  
      var style = {
         w: function(lW){     b.lineWidth = lW;   },
         a: function(gAfa =1 ){     b.globalAlpha = gAfa;  },
         c: function(lC){   b.lineCap = ""+lC;       },
         tA: function(tA){   b.textAlign = tA ;      },
         tB: function(tB){   b.textBaseline = tB;    }
     }
     
     var color = function(color){
            if(color[0] == "." && color[1] ){ b.strokeStyle = color.slice(1);    }
            else {     b.fillStyle = color; }
     }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    
           var arL =  [ {I:0, S:"end"} ];
                   for(i=0; 1000>i;  i++){      
                       arL.push( {I:0, S:"waiting"} );   
                    }   
     anim = function(start, speed, limit, index, PorN = "+", lax = 4000){
       var varb = 0;
       accler= (1+speed/10)// speed*3;
	   speeder = speed;
      if(PorN == "-"){ accler = (1)  
               varb = (speed*10)-(varb/(limit/8)); 
			   speeder = 0;
      }
      if(PorN == "linear"){ accler = (1)  
               var varb = (speed*10);
			   speeder = 0;
      }
	  if(PorN == "-#"){ accler = 1/(1+limit/(25000+lax))  // limit/25000
               varb = limit/50
			   speeder = 0;
			   /*  This decclerator fumction is still very much debug */
      }
      if(arL[start].S != "end" && arL[index].S == "end") { 
          arL[start].I = accler*(arL[start].I+speeder+varb);
          arL[start].S = "running"
      }
      if(arL[start].I > limit-0.00000000001) arL[start].S = "end";
      return arL[start].I;
               }
               
   
       
   
   
        
        
        
        
        
      
      var arLTextWrite =  [ {I:0, S:"end"} ];
                   for(i=0; 500>i;  i++){      arLTextWrite.push( {I:0, S:"waiting"} );        }          
      var textWrite = function( text, arr ){ 
                //console.log(""+"newT") 
                var start = arr[0]; var speed=arr[1]; var limit = arr[2]; var index =  arr[3]; 
          var accler=  (1+speed/15);
      if(arLTextWrite[start].I < limit && arLTextWrite[index].S == "end"){
          arLTextWrite[start].I =accler*(arLTextWrite[start].I+speed);}
      if(arLTextWrite[start].I > limit) arLTextWrite[start].S = "end";
          var animator = arLTextWrite[start].I;
                var newT = "";
                if (animator>  1000) { console.log(""+"animATOR'S limit MUST == 1000");      }
                var index= Math.round(animator*text.length/1000);
             for ( i=0; index>i; i++){      newT = newT + text[i];     }
             return newT;
           }
      
      
      
      
      
      var arLTextWriteBeta =  [ {I:0, S:"end"} ];
                for(i=0; 500>i;  i++){ 
                    arLTextWriteBeta.push( {I:0, S:"waiting"} );        }

      var textWriteBeta = function( text, arr ){ 
           var start = arr[0]; var speed=arr[1]; //test speed=15 low perf
           var index =  arr[2];  var accler=  (speed/15);
           var limit = text.length;  
if(arLTextWriteBeta[start].I < limit && arLTextWriteBeta[index].S == "end"){
   arLTextWriteBeta[start].I = (arLTextWriteBeta[start].I+accler); }
if(arLTextWriteBeta[start].I > limit/1.01){ 
    arLTextWriteBeta[start].S = "end";   }
               var tInd = Math.round(arLTextWriteBeta[start].I);
               var newTBeta = text.slice(0, tInd);  
               return newTBeta;
           }
      
      
      
      
      
      
   var arLExplode =  [ {I:0, S:"end"} ];
                   for(i=0; 500>i;  i++){      arLExplode.push( {I:0, S:"waiting"} );        }     
    var explode =  function ( x, y, r, startCircle, end, color, arr){
                   var start = arr[0]; var speed=arr[1]; var limit = arr[2]; var index =  arr[3];
          var accler= speed*3;
    if(arLExplode[start].I < limit && arLExplode[index].S == "end")  arLExplode[start].I = (1+accler/30)*(arLExplode[start].I+speed);
      if(arLExplode[start].I > limit) arLExplode[start].S = "end";
          var animator = arLExplode[start].I;
 if( arLExplode[start].I < limit ) arc.m(x, y, r+animator, startCircle, end, color);
       }
       
                
      
      
      
      
      
      
      
var writer = function (string, font, availSize, arrTextPos, callstyles){
                  
     fontSize = font.split(" ")[0].replace("pt", "");
     if(!fontSize.includes("pt")){ 
         fontSize = font.split(" ")[1].replace("pt", "");  }
     textFont = font
     var newL = 0; var newS = "";
     var arrOfString = new Array();
         
     
        function rep(){
          for(var i=0; string.length>i; i++){
     b.font = textFont;  
     textWid = b.measureText(string.slice(0, i)).width;
     if(textWid > availSize || string[0] == "\r"){ 
         newL = i;   
         lSp =  string.slice(0, newL).lastIndexOf(" "); 
         newS = string.slice(0, newL).slice(0, lSp);   
         arrOfString.push(newS);
         string = string.slice(lSp, string.length).trim();
         
         rep()
         break;
     }
          }
                }
                rep()
     arrOfString.push(string);
    
    
arrOfString.map(function(strs, ind){
callstyles(ind);
    tPosX = arrTextPos[0];
    tPosY = arrTextPos[1]+ ind*fontSize*(1.7);
    strokeW = arrTextPos[2]
txt(textFont, strs, tPosX, tPosY, strokeW, 10000)
})
             
             
              }
      
      
      
      
     
      
      
      
      
      
      // compound utilities
function gridAyG(width,height,nX, nY, colour,thickness, shiftX =0,shiftY = 0){
		
		for(i=0; width>i; i = i+width/nX){ 
		for(j=0; height>j; j = j+height/nY){
		      singleL(shiftX+0, width, shiftY+j, 0, colour, thickness)
		      singleL(shiftX+i, 0, shiftY+0, height, colour, thickness)
		}}
		
		}
				
var getGrid = function(){
            var gRX;
            var gRY;
            gRX = new Array();
            gRY = new Array();
        return {
make: function(width=sW, height = sH, nX=3, nY=3, shiftX=0, shiftY=0){
             this.nX = nX; this.nY = nY;
		for(i=0; nX>i; i=i+1){ 
		  gRX[i] = shiftX+i*(width/nX);
		}
		for(j=0; nY>j; j=j+1){ 
		  gRY[j] = shiftY+j*(height/nY)
		}   
                         },
nX: null,
nY: null,
getGX: function(ind){ return gRX[ind];   },
getGY: function(ind){ return gRY[ind];   },
useGR: function(callback){  
		      callback(gRX, gRY, this.nX, this.nY);  
		                 }//EO useGR
                 }//EO return
              
    }//EO getGrid
    
    
    function eLoop(limit, callback){
                     for(var ij=0; limit>ij; ij++){  callback(ij);  }  
    }
      
      
      
      
      
      
      
 
      
      
      
      
      
      
      
      
      
      var propStore = {
            lightskin: "#af6e51"
        }
      
      
      
        
        
