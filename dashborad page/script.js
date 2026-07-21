let progress=0;
let bar=document.getElementById("progress");
let interval=setInterval(()=>{
    if(progress>=78){    
        clearInterval(interval);
    }else{
        progress++;
        bar.style.width=progress+"%";
        bar.innerHTML=progress+"%";
}
},20);
