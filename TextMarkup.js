function TextMarkup(content, elementattr={}){
elementattr = 
{h2:"",h3:"",strong:"",em:"",u:"",mark:"",q:"",img:"",...elementattr};
Context = this;




//svg pack
var svg_bullet_list = 
'<svg height="512pt" viewBox="0 -43 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m85.332031 42.667969c0 23.5625-19.101562 42.664062-42.664062 42.664062-23.566407 0-42.667969-19.101562-42.667969-42.664062 0-23.566407 19.101562-42.667969 42.667969-42.667969 23.5625 0 42.664062 19.101562 42.664062 42.667969zm0 0"/><path d="m85.332031 213.332031c0 23.566407-19.101562 42.667969-42.664062 42.667969-23.566407 0-42.667969-19.101562-42.667969-42.667969 0-23.5625 19.101562-42.664062 42.667969-42.664062 23.5625 0 42.664062 19.101562 42.664062 42.664062zm0 0"/><path d="m85.332031 384c0 23.5625-19.101562 42.667969-42.664062 42.667969-23.566407 0-42.667969-19.105469-42.667969-42.667969s19.101562-42.667969 42.667969-42.667969c23.5625 0 42.664062 19.105469 42.664062 42.667969zm0 0"/><path d="m170.667969 64h320c11.796875 0 21.332031-9.535156 21.332031-21.332031s-9.535156-21.335938-21.332031-21.335938h-320c-11.796875 0-21.335938 9.539063-21.335938 21.335938s9.539063 21.332031 21.335938 21.332031zm0 0"/><path d="m490.667969 192h-320c-11.796875 0-21.335938 9.535156-21.335938 21.332031s9.539063 21.335938 21.335938 21.335938h320c11.796875 0 21.332031-9.539063 21.332031-21.335938s-9.535156-21.332031-21.332031-21.332031zm0 0"/><path d="m490.667969 362.667969h-320c-11.796875 0-21.335938 9.535156-21.335938 21.332031s9.539063 21.332031 21.335938 21.332031h320c11.796875 0 21.332031-9.535156 21.332031-21.332031s-9.535156-21.332031-21.332031-21.332031zm0 0"/></svg>';
var svg_underline =
'<svg id="Capa_1" enable-background="new 0 0 467.765 467.765" height="512" viewBox="0 0 467.765 467.765" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m58.471 409.294h350.824v58.471h-350.824z"/><path d="m292.353 0v58.471h29.235v175.412c0 48.364-39.342 87.706-87.706 87.706s-87.706-39.342-87.706-87.706v-175.412h29.235v-58.471h-116.94v58.471h29.235v175.412c0 80.597 65.579 146.176 146.176 146.176s146.176-65.579 146.176-146.176v-175.412h29.235v-58.471z"/></svg>';
var svg_bold = 
'<svg height="426pt" viewBox="-42 0 426 426.66667" width="426pt" xmlns="http://www.w3.org/2000/svg"><path d="m279.734375 197.566406c24.597656-20.5625 40.597656-51.070312 40.597656-85.566406 0-61.761719-50.238281-112-112-112h-186.664062c-11.777344 0-21.335938 9.535156-21.335938 21.332031s9.558594 21.335938 21.335938 21.335938h21.332031v341.332031h-21.332031c-11.777344 0-21.335938 9.535156-21.335938 21.332031s9.558594 21.335938 21.335938 21.335938h197.332031c67.625 0 122.667969-55.019531 122.667969-122.667969 0-45.546875-25.003907-85.269531-61.933594-106.433594zm-71.402344-154.898437c38.230469 0 69.335938 31.101562 69.335938 69.332031s-31.105469 69.332031-69.335938 69.332031h-122.664062v-138.664062zm10.667969 341.332031h-133.332031v-160h133.332031c44.117188 0 80 35.902344 80 80s-35.882812 80-80 80zm0 0"/></svg>';
var svg_italic = 
'<svg height="426pt" viewBox="-106 0 426 426.66667" width="426pt" xmlns="http://www.w3.org/2000/svg"><path d="m192.332031 0h-64c-11.773437 0-21.332031 9.535156-21.332031 21.332031s9.558594 21.335938 21.332031 21.335938h3.949219l-94.828125 341.332031h-15.785156c-11.777344 0-21.335938 9.535156-21.335938 21.332031s9.558594 21.335938 21.335938 21.335938h64c11.773437 0 21.332031-9.539063 21.332031-21.335938s-9.558594-21.332031-21.332031-21.332031h-3.949219l94.828125-341.332031h15.785156c11.777344 0 21.335938-9.539063 21.335938-21.335938s-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>';
var svg_quote =
'Quote';
var svg_undo =
'<svg height="512pt" viewBox="0 0 512 512.00241" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 .00390625c-62.675781 0-123.605469 23.08203175-171.09375 62.26953175l-57.597656-57.597657c-4.585938-4.566406-11.457032-5.933593-17.429688-3.457031-5.972656 2.472656-9.878906 8.296875-9.878906 14.785156v138.664063c0 8.832031 7.167969 16 16 16h138.667969c6.484375 0 12.308593-3.902344 14.785156-9.875 2.472656-5.972657 1.109375-12.84375-3.480469-17.429688l-50.75-50.773437c39.445313-31.425782 89.363282-49.921875 140.777344-49.921875 117.632812 0 213.335938 95.703125 213.335938 213.335937 0 117.628906-95.703126 213.332032-213.335938 213.332032-56.9375 0-110.503906-22.207032-150.804688-62.527344-8.339843-8.34375-21.824218-8.34375-30.164062 0-8.34375 8.339844-8.34375 21.824218 0 30.164062 48.363281 48.382813 112.640625 75.03125 180.96875 75.03125 141.164062 0 256-114.839844 256-256 0-141.164062-114.835938-255.99999975-256-255.99999975zm0 0"/></svg>';
var svg_highlight =
'Highlight';
var svg_erase =
'<svg height="451pt" viewBox="0 -21 451.62667 451" width="451pt" xmlns="http://www.w3.org/2000/svg"><path d="m432.789062 213.757812c12.140626-12.136718 18.835938-28.179687 18.835938-45.160156 0-17.109375-6.675781-33.238281-18.835938-45.378906l-104.554687-104.554688c-23.828125-24.425781-67.070313-24.445312-90.730469-.191406l-218.472656 218.476563c-12.289062 11.96875-19.03125 28.136719-19.03125 45.566406 0 17.28125 6.742188 33.386719 18.835938 45.164063l39.957031 39.957031h-32.125c-11.777344 0-21.335938 9.558593-21.335938 21.332031 0 11.777344 9.558594 21.335938 21.335938 21.335938h384c11.773437 0 21.332031-9.558594 21.332031-21.335938 0-11.773438-9.558594-21.332031-21.332031-21.332031h-131.757813zm-164.925781-165.3125c4.949219-5.074218 10.792969-6.140624 14.804688-6.140624 4.117187 0 10.066406 1.066406 15.210937 6.335937l104.746094 104.746094c4.074219 4.074219 6.335938 9.492187 6.335938 15.210937 0 5.585938-2.242188 10.921875-6.335938 14.996094l-64.023438 64.019531-134.953124-134.953125zm0 0"/></svg>';
   
   
   
   
   
let body = DOMHelp._("body");
let markupboard = this.board = 
document.createElement("TM-markupboard-wrapper");
body.append(markupboard);
markupboard.innerHTML = 
"<div id='TM-buttonsboard'>"
    +"<div id='TM-topsection'>"
        +"<div id=\"TM-scrollpageX1\">"
            +"<button data-mark='formatBlock:<h2 "+elementattr.h2+">:</h2><p>' > <strong>Hh</strong> </button>"
            +"<button data-mark='formatBlock:<h3 "+elementattr.h3+">:</h3><p> ' >  <strong>Hhh</strong> </button>"
            +"<button data-mark='formatBlock:<strong "+elementattr.strong+">:</strong>' id='toB'>  <strong>"+svg_bold+"</strong> </button>"
            +"<button data-mark='formatBlock:<em "+elementattr.em+">:</em>' > <em>"+svg_italic+"</em> </button>"
            +"<button data-mark='formatBlock:<u "+elementattr.u+">:</u>' >       <u>"+svg_underline+"</u></button>"
            +"<button data-mark='formatBlock:<mark "+elementattr.mark+">:</mark>' > <mark>"+svg_highlight+"</mark> </button>"
            +"<button data-mark='formatBlock:<q "+elementattr.q+" cite=\":\"></q>' >"+svg_quote+"</button>"
        +"</div>"
        +"<div id=\"TM-scrollpageX2\">"
            +"<button data-mark='formatBlock:<ul blogul><li>:</li></ul>'  type=\"createspace\">"+svg_bullet_list+"</button>"
            +"<button data-mark='formatBlock:<img tm-img src=\"img/defaultimlast.png\" "+elementattr.img+" alt=\":\"/>' > Upload Image        </button>"
        +"</div>"
    +"</div>"
    +"<div id='TM-undersection'>"
        +"<button id='TM-undo-but'>"+svg_undo+"</button>"
        +"<button id='TM-hideboard-but'>Hide Board </button>"
        +"<button id='TM-clearall-but'>"+svg_erase+"</button>"
    +"</div>"
+"</div>";
    
    
//set styles.
DOMHelp._("#TM-buttonsboard").style = "border-radius: 10px; background: inherit;    width: 100%;    display: block;    text-align: center;    padding: 5px; box-sizing: border-box;    color: white; font-family: font6;    -webkit-box-shadow: 1px 1px 5px -1px grey;     -moz-box-shadow: 1px 1px 5px -1px grey;     box-shadow: 1px 1px 5px -1px grey;    white-space: nowrap;  position: fixed; top: 0; background-color: #aabbdd;";
DOMHelp._("#TM-topsection").style = "width: 100%; overflow-x: scroll;  overflow-y: none;  ";
DOMHelp._("#TM-scrollpageX1").style ="width: 100%; display: inline-block;    white-space: normal; ";
DOMHelp._("#TM-scrollpageX2").style = "width: 100%; display: inline-block;    white-space: normal; ";
DOMHelp._("#TM-undersection").style = "width: 100%; ";
[...document.querySelectorAll("#TM-buttonsboard button[data-mark]")]
.map((but)=>{
      but.style="background: rgb(22, 19, 55); border-color: transparent;    color: white; font-family: courier;     box-shadow: 1px 1px 5px -1px black; display: inline; margin: 3px;  padding: 5px;";
});
[...document.querySelectorAll("#TM-buttonsboard button[data-mark] svg")]
.map((svg)=>{
      svg.style="width: 20px; height: 10px; margin: 0; display: inline-block; filter: invert(100%); ";
});
[...document.querySelectorAll("#TM-undersection button svg")]
.map((svg)=>{
      svg.style="width: 20px; height: 10px; margin: 0; display: inline-block; filter: invert(0%); ";
});
   
   
   
   
   
   
   
   
   
   
   
content.setAttribute("contenteditable",true);
markupboard.style.display = "none"
content.onfocus = ()=>{markupboard.style.display = "inline";}
//content.onblur = ()=>{ markupboard.style.display = "none";};
   
   
   
   
   
//controls
DOMHelp._("#TM-hideboard-but").onclick = function () {
    markupboard.style.display = "none";
}
DOMHelp._("#TM-undo-but").onclick = function () {
    Undo();
}
DOMHelp._("#TM-clearall-but").onclick = function () {
    ClearAll();
    content.focus();
}
content.addEventListener("paste", function (e) {
    var clipboardData = e.clipboardData; 
    var cboardText = clipboardData.getData("text/plain");
    e.preventDefault();
    document.execCommand("insertText", false, cboardText);
});
    
[...document.querySelectorAll("#TM-buttonsboard button[data-mark]") ]
.map( function(btn){
    btn.addEventListener("click",function(event){  mark(btn, event); } ); 
});






var markactions = [{result: content.innerHTML}];
var undoCount = 0;
function mark(el, event){ 
 event.preventDefault();
 var attr_val = el.getAttribute("data-mark").split(":");
 var highlighted = document.getSelection();
 
 //ReplaceTagToText
 ReplaceTagToText(highlighted, attr_val[1], attr_val[2]); 
 
 //ReplaceTextToTag;
 content.innerHTML = content.innerHTML
 .replace( (new RegExp(":LT:", 'g')), "<")
 .replace( (new RegExp(":GT:", 'g')), ">");
 
 Context.html = content.innerHTML;
 markactions.push({result: content.innerHTML});
 undoCount = markactions.length-1;
 AttachImages();
}//EO mark



function ReplaceTagToText(highlighted, startTag, closeTag){ 
 var hText = highlighted.toString();
 var hlStartNode = highlighted.anchorNode;
 var hlEndNode = highlighted.focusNode;    
 var hlStartPosition = highlighted.anchorOffset;    
 var hlEndPosition = highlighted.focusOffset; 
 
 startTag = startTag
 .replace( (new RegExp("<", 'g')), ":LT:")
 .replace( (new RegExp(">", 'g')), ":GT:");
 closeTag = closeTag
 .replace( (new RegExp("<", 'g')), ":LT:")
 .replace( (new RegExp(">", 'g')), ":GT:");
 
 function InsertAt(a,b,pos){return[a.slice(0,pos),b,a.slice(pos)].join(''); }
 highlighted.focusNode.data=InsertAt(hlEndNode.data,closeTag, hlEndPosition);
 highlighted.anchorNode.data=InsertAt(hlStartNode.data,startTag, hlStartPosition);
}//EO repler
   
   
function Undo(){
    if(undoCount>=1)content.innerHTML = markactions[--undoCount].result;
}   
    
    
function ClearAll(){
    content.innerHTML = "";
    Context.html = content.innerHTML;
    markactions.push({result: content.innerHTML});
    undoCount = markactions.length-1;
}   
    
    
    
    
    
    
    

this.getImages = function (){
    var images = [];
    [...document.querySelectorAll("[tm-img]")].map((tmimg)=>{
        images.push(tmimg.file);
    })
    return images;
}
function AttachImages(){
    [...document.querySelectorAll("[tm-img]")].map((tmimg)=>{
        new ImageUploader(tmimg);
    })
}
    
function ImageUploader(image){
    let image_input = document.createElement("input");
    image_input.setAttribute("hidden", "");
    image_input.setAttribute("type", "file");
    image_input.setAttribute("accept", "image/*");
    //implements long click.
    image.onclick = ()=>{ image_input.click();}
    image_input.onchange = (evt)=>{ 
        var files = evt.target.files;
        if(files.length === 0){ alert('No files selected'); return; }
        var reader = new FileReader();
        reader.onload = function(event) {
            image.src = event.target.result;
        }
        reader.readAsDataURL(files[0]);
        image.file = files[0];
    } //EO product_image
}//EO ImageUploader
   
   
   
   
   
   
   
}//EO TextMarkUp