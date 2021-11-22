

window.addEventListener("load",()=>{

    document.getElementById("login-submit").addEventListener("click",()=>{
        fetch("/loginUser",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json' ,//this must be set to a json type
            },
            body:JSON.stringify({username:"US",password:"LOAD"})
        }).then(response=>response.text())
            .then(data=>console.log(data))
            .catch(err=>console.error(err))
    })




})