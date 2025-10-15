const cheap = document.getElementById("cheap-box");
const good = document.getElementById("good-box");
const fast = document.getElementById("fast-box");

function gtoggle(){
        cheap.checked = false;
        fast.checked = false;
        good.checked=true;
        
        
    }
    
    function ctoggle(){
        good.checked = true;
        fast.checked = false;
        cheap.checked=true;
    }
    function ftoggle(){
        good.checked = false;
        fast.checked=true;
        cheap.checked =false;
        
}