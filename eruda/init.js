
//document.write("<script src='../../res/js/lib/eruda.min.js' ></script>");
var cont = document.createElement("div");
//cont.style = "width: 100%; height: 50%; background: red; position: absolute; bottom:0%;";
document.body.appendChild(cont);
eruda.init({
    container: cont,
    tool: ['console', 'elements'],
})



/*

(function(){ 
    var s1 = document.createElement("script");
    s1.src="http://localhost:1111/eruda/eruda.min.js";
    var s2 = document.createElement("script");
    s2.innerHTML = "eruda.init();";
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(s1); h.appendChild(s2);
})()
*/