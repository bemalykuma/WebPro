let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirm");
passwordInput.showPassword = false;
confirmPasswordInput.showPassword = false;

function togglePassword() {
    if (passwordInput.showPassword) {
        passwordInput.type = "password";
        passwordInput.showPassword = false;
    } else {
        passwordInput.type = "text";
        passwordInput.showPassword = true;
    }
}
function toggleConfirmPassword() {
    if (confirmPasswordInput.showPassword) {
        confirmPasswordInput.type = "password";
        confirmPasswordInput.showPassword = false;
    } else {
        confirmPasswordInput.type = "text";
        confirmPasswordInput.showPassword = true;
    }
}

function Register() {
    let username = document.getElementById("username").value;
    let Email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirm").value;
    let phone = document.getElementById("phoneNum").value;

    if (username.length < 5 ) {
        alert("Username must be at least 5 characters long");
        return false;
    }
    if (Email.indexOf("@") == -1 || Email.indexOf(".") == -1) {
        alert("Email is not this format");
        return false;
    }
    if (phone.length != 10) {
        alert("Phone number must be 10 digits");
        return false;
    }
    if (isNaN(phone)) {
        alert("Phone number must contain only digits");
        return false;
    }
    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {

        alert("Password must contain at least one special character");
        return false;
    }
    if (!/[0-9]/.test(password)) {
        alert("Password must contain at least one number");
        return false;
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        alert("Password must contain at least one uppercase and one lowercase letter");
        return false;
    }
    if  (password != confirmpassword) {
        alert("Passwords do not match, please try again");
        return false;
    }
    alert("Registration successful!");
    return true;

}
var embedimSnow=document.getElementById("embedim--snow");
if(!embedimSnow){
    let embRand2=function(min,max){
        return Math.floor(Math.random()*(max-min+1))+min}
        ,embRandColor2=function(){
            var items=["radial-gradient(circle at top left,#dcf2fd,#60b4f2)","#dbf2fd","#d8f8ff","#b8ddfa"];var item=items[Math.floor(Math.random()*items.length)];return item};
            var embRand=embRand2,embRandColor=embRandColor2;
            var embCSS=".embedim-snow{position: absolute;width: 10px;height: 10px;background: white;border-radius: 50%;margin-top:-10px}";
            var embHTML="";
            for(i=1;i<200;i++){
                embHTML+='<i class="embedim-snow"></i>';
                var rndX=embRand2(0,1e6)*1e-4,rndO=embRand2(-1e5,1e5)*1e-4,rndT=(embRand2(3,8)*10).toFixed(2),rndS=(embRand2(0,1e4)*1e-4).toFixed(2);
                embCSS+=".embedim-snow:nth-child("+i+"){background:"+embRandColor2()+";opacity:"+(embRand2(1,1e4)*1e-4).toFixed(2)+";transform:translate("+rndX.toFixed(2)+"vw,-10px) scale("+rndS+");animation:fall-"+i+" "+embRand2(10,30)+"s -"+embRand2(0,30)+"s linear infinite}@keyframes fall-"+i+"{"+rndT+"%{transform:translate("+(rndX+rndO).toFixed(2)+"vw,"+rndT+"vh) scale("+rndS+")}to{transform:translate("+(rndX+rndO/2).toFixed(2)+"vw, 105vh) scale("+rndS+")}}"}embedimSnow=document.createElement("div");
                embedimSnow.id="embedim--snow";
                embedimSnow.innerHTML="<style>#embedim--snow{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none}"+embCSS+"</style>"+embHTML;document.body.appendChild(embedimSnow)}
// widget by Embed.im (Licenses & Credits: https://app.embed.im/licenses.txt)
// var embedimSparkles=document.getElementById("embedim--sparkles");if(!embedimSparkles){let embedimSparkle2=function(x,y){const sparkle=document.createElement("div");const color=embedimSparkleColors[Math.floor(Math.random()*embedimSparkleColors.length)];const size=Math.random()*15+5;const angle=Math.random()*Math.PI*2;const rotation=Math.random()*240-120;const opacity=Math.random()*.5+.5;const distance=Math.random()*50+10;sparkle.style.color="#"+color;sparkle.style.width=`${size}px`;sparkle.style.height=`${size}px`;sparkle.style.left=`${x}px`;sparkle.style.top=`${y}px`;sparkle.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="236.654 301.146 140.686 140.677"><path d="M302.184 304.627c1.547-4.642 8.101-4.642 9.648 0l9.072 27.244c4.037 12.138 13.573 21.66 25.725 25.71l27.23 9.072c4.641 1.547 4.641 8.102 0 9.649l-27.244 9.072a40.57 40.57 0 0 0-25.711 25.725l-9.072 27.229c-1.223 3.713-6.006 4.712-8.608 1.801a4.843 4.843 0 0 1-1.04-1.801l-9.072-27.243a40.611 40.611 0 0 0-25.711-25.711l-27.244-9.072c-3.713-1.224-4.726-6.006-1.814-8.608a4.889 4.889 0 0 1 1.814-1.041l27.244-9.072a40.675 40.675 0 0 0 25.711-25.71l9.072-27.244Z"/></svg>`;sparkleHolder.appendChild(sparkle);sparkle.animate([{opacity,transform:"translate(-50%,-50%) scale(1) rotate("+rotation+"deg)"},{opacity:0,transform:`translate(calc(-50% + ${Math.cos(angle)*distance}px), calc(-50% + ${Math.sin(angle)*distance}px)) scale(0) rotate(0)`}],{duration:1e3,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"forwards"});setTimeout(()=>{sparkle.remove()},1e3)};var embedimSparkle=embedimSparkle2;const sparkleHolder=document.createElement("div");sparkleHolder.classList.add("embedim--sparkles");sparkleHolder.innerHTML=`<style>.embedim--sparkles{pointer-events:none;position:fixed;top:0;left:0;bottom:0;right:0;z-index:9999999999999}.embedim--sparkles div{position:absolute;width:10px;height:10px}</style>`;document.body.appendChild(sparkleHolder);const embedimSparkleColors=["FFD700","FF8C00","f8e867","eda94d","f9e794"];document.addEventListener("mousemove",e=>{embedimSparkle2(e.clientX,e.clientY)});document.addEventListener("touchmove",e=>{e.preventDefault();const touch=e.touches[0];cursor.style.left=touch.clientX+"px";cursor.style.top=touch.clientY+"px";embedimSparkle2(touch.clientX,touch.clientY)},{passive:false})}
