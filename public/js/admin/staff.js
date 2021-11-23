
window.addEventListener("load",()=>{
    let errField=document.getElementById("staff-add-err")
    fetch("/admin/getAllStaff",{
        method:"GET"
    }).then((response)=>response.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))

    fetch("/getAllAddictions",{
        method:"GET"
    }).then((response)=>response.json())
        .then(data=>{
            let addictionSelect=document.getElementById("addiction-speciality")

            data.forEach(addiction=>{
                let option=document.createElement("option")
                option.setAttribute("value",addiction.id)
                option.innerHTML=addiction.name
                addictionSelect.appendChild(option)
            })
        })
        .catch(err=>console.error(err))


    document.getElementById("submit-add-staff").addEventListener("click",()=>{
        let password=document.getElementById("staff-password")
        let confirmPassword=document.getElementById("staff-confirm-password")
        let registerStaffForm=document.getElementById("register-staff-form")

        if(password.value!=confirmPassword.value){
            errField.innerText="Passwords do not match"
            return
        }
        let formData=new FormData(registerStaffForm)
        let dataToSubmit={}
        for (const key of formData.keys()){
            dataToSubmit[key]=formData.get(key)
        }
        fetch("/admin/registerStaff",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json' ,//this must be set to a json type
            },
            body:JSON.stringify(dataToSubmit)
        }).then((response)=>response.json())
            .then(data=>console.log(data))
            .catch(err=>console.error(err))


    })
})