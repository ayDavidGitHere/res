










function $(string){ 
          return  document.getElementById(string);
}
function CLS(string, index){ 
     if(typeof index == "number"){
          return  document.getElementsByClassName(string)[index];
      }
     if(index == "length"){
         return  document.getElementsByClassName(string).length;    
      }
     if(index == "class"){ 
         return  document.getElementsByClassName(string);
     }
}
function TAGN(string, index){
     if(typeof index == "number"){
          return  document.getElementsByTagName(string)[index];
      }
     if(index == "length"){
         return  document.getElementsByTagName(string).length;    
      }
     if(index == "class"){ 
        return  document.getElementsByTagName(string);
     }
}//EO tagn
function getAllElem( elementsBy, callback ){
[].slice.call( elementsBy ).map( function(elementAt, elementInd){
       callback(elementAt, elementInd);
});  
console.warn("is Deprecated Check 'MHelp.objCallB'")
}
function getAll$Els( elementsBy, callback ){
[].slice.call( elementsBy ).map( function(elementAt, elementInd){
       callback(elementAt, elementInd);
});  
console.warn("is Deprecated Check 'MHelp.objCallB'")
}



















///HTTP 

function ajaxer(type, phpAddress, callback, callbackYet=function(){} ){
var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
     
if (xmlhttp.readyState == 4 ){
    if (xmlhttp.status == 200) {
          callback(xmlhttp.responseText);
    }
}
    else{
           callbackYet();
    }
     
 
 };
 xmlhttp.open(type, phpAddress, true);
 xmlhttp.send();
             }
             
             
             
             
             
             
             
             
             
             
             
             
      
function wordCount( val ){
 var wom = val.match(/\S+/g);
 return {
 charactersNoSpaces : val.replace(/\s+/g, '').length,
 characters : val.length,
 words : wom ? wom.length : 0,
 lines : val.split(/\r*\n/).length
 };
}
// Use like:







//Element utils
              var adjustTextArea = function(theTextArea, fontSize){
theTextArea.addEventListener("input", function(){ 
       var textAreaV = theTextArea.value; 
       var nOfCols = theTextArea.cols
       var tALen = textAreaV.length;
       var defaultHeight = 0;
       
       var wordsLines = (wordCount( textAreaV ).lines)-1;
       var rows = (theTextArea.rows)-1;
       var rows2 = 1+Math.ceil( textAreaV.length/nOfCols );
       var newHeight = defaultHeight+(wordsLines*fontSize)+(rows2*fontSize);
       
       theTextArea.style= "height: "+newHeight+"px;";
       //TAGN("rpx", 0).innerHTML = nOfCols+"; "+rows2+"; "+newHeight+"; "
     
     return{
           info: function(){ return "first release: buggy"; }
          }
} )
              }
           
             
             
             
             
             
             
function getAll$Properties(obj, props = []){
 return obj == null ? props :
 getAll$Properties(Object.getPrototypeOf(obj),
 props.concat(Object.getOwnPropertyNames(obj)));
 console.log("is Deprecated, check 'ObjHelp.getProps'")
}
     
             
             
             
//protos
Array.prototype.ay = {
      shuffle: function(arr){  
          arr.sort(function(a, b){
              return Math.random()-0.5;
          })
      }
}//EO ay
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
console.info("Keywords: MHelp,  DOMHelp,  ObjHelp ");
class MHelp{
    
    static compareArr(arr, arrComp, callback){
        if( JSON.stringify(arr) == JSON.stringify(arrComp) ){
            callback()
        }
    }
    static randOpt(val, val2){
        return arguments[Math.floor(Math.random()*arguments.length)]
    }
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static convDegRad(deg){
        return deg*(Math.PI/180)
    }
    static objCallB( elementsBy, callback ){
        [].slice.call( elementsBy ).map( function(elementAt, elementInd){
            callback(elementAt, elementInd);
        });  
    }
    static indexFrom(cnt, i, j){
        return i*cnt+j; //5, 3, 2 = 
    }
    static clamp(val, min, max) {
        return Math.min(Math.max(min, +val), max);
    }
    static resultantOf(x, y){
        return Math.sqrt( Math.pow(x, 2)+Math.pow(y, 2) );
    }
    static signelta(num, over){
      return (1- 2*(Math.floor(num/over)%2));
    }
    static countIn(string, substring){
        return ( string.split(substring).length -1 );
    } 
    
}//EO MHelp






class ObjHelp{
    
    static getPropsOf(obj, props = []){
        return obj == null ? props :
        this.getPropsOf(Object.getPrototypeOf(obj),
        props.concat(Object.getOwnPropertyNames(obj)));
    }
    
}//EO ObjHelp
    
    
    
    
class DOMHelp{
    
    static $(string){ 
          return  document.getElementById(string);
    }
    static CLS(string, index){ 
        if(typeof index == "number"){
          return  document.getElementsByClassName(string)[index];
        }
        if(index == "length"){
         return  document.getElementsByClassName(string).length;    
        }
        if(index == "class"){ 
         return  document.getElementsByClassName(string);
        }
    }
    static TAGN(string, index){
        if(typeof index == "number"){
          return  document.getElementsByTagName(string)[index];
        }
        if(index == "length"){
         return  document.getElementsByTagName(string).length;    
        }
        if(index == "class"){ 
        return  document.getElementsByTagName(string);
        }
    }//EO tagn
    
}



class NETHelp {
    static AJAX(type, params, address, callback, callbackYet=function(){} ){
        var url = address + '?';
        var notFirst = false;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                url += (notFirst ? '&' : '') + key + "=" + params[key];
            }
            notFirst = true;
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ){
            if (xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
        }
        }
        else{callbackYet();}
        };
        xmlhttp.open(type, url, true);
        xmlhttp.send();
    }
             
}//EO NETHelp
    
    
    
    
    
    
    