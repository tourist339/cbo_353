window.addEventListener("load",()=>{

    document.getElementById("register-submit").addEventListener("click",()=>{
    fetch("/registerCustomer",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json' ,//this must be set to a json type

        },
        body:JSON.stringify({username:document.getElementById("register-username").value,password:document.getElementById("register-password").value})
    }).then(response=>response.text())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))
})
})