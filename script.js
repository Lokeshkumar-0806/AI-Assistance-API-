let prompt=document.querySelector("#prompt");
let btn=document.querySelector("#btn");
let container=document.querySelector("#container");
let chatContainer=document.querySelector("#chat-Container");
let userMessage=null;
let Api_URL='https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAyr6UZVC_ptHM4BpEID7XI0RbfZvYWLck'


function createchatBox(html,className){
    let div=document.createElement("div");
    div.classList.add(className);
    div.innerHTML=html;
    return div;
}
async function getAPIResponse(aiChatBox){
    let textElement=aiChatBox.querySelector(".text")

    try{
        let response=await fetch(Api_URL,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                contents:[
                {"role":"user",
                "parts":[{text:userMessage}]}]
            })
        })
        let Data=await response.json();
        let apresponse=Data?.candidates[0].content.parts[0].text
        textElement.innerText=apresponse;

    }
    catch(error){
        console.log(error)

    }
    finally{
        aiChatBox.querySelector(".loading").style.display="none";
    }
}

function showLoading(){
    let html=`<div class="img">
                <img src="AI.webp" alt="" width="50px">
            </div>
            <p class="text"></p>
            <img class="loading" src="loading-ezgif.com-gif-to-webp-converter.webp" alt="loading" height="50">`
            let aiChatBox=createchatBox(html,"ai-chat-box")
            chatContainer.appendChild(aiChatBox)
            getAPIResponse(aiChatBox)
}

btn.addEventListener("click",()=>{
    userMessage=prompt.value;
    if(userMessage==""){
        container.style.display="flex";
    }{
        container.style.display="none";
       
    }
    if(!userMessage) return;
    let html=`<div class="img">
                <img src="user.webp" alt="" width="50px">
            </div>
            <p class="text"></p>`;
        let userChatBox=createchatBox(html,"user-chat-box")
        userChatBox.querySelector(".text").innerText=userMessage;
        chatContainer.appendChild(userChatBox)
        prompt.value="" 

        setTimeout(showLoading,500)
})
