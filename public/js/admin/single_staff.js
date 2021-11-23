import {fillAddicitonsList} from "../base.js";

let user_data={}
window.addEventListener("load",async () => {
    let staffFirstName=document.getElementById("first-name")
    let staffLastName=document.getElementById("last-name")

    fetch("/admin/getSingleStaff?id=" + new URLSearchParams(window.location.search).get("id"), {
        method: "GET"
    }).then((response) => response.json())
        .then(data => {
            if(data.result) {
                let staffData=data.data;
                console.log(staffData)

                staffFirstName.value=staffData.firstname
                staffLastName.value=staffData.lastname

                fillAddicitonsList("addiction-speciality", () => {
                    let options = document.getElementById("addiction-speciality").children
                    for (let i = 0; i < options.length; i++) {
                        if(options[i].value==staffData.addiction_speciality){
                            options[i].setAttribute("selected",true)
                        }
                    }
                })
            }
        })
        .catch(err => console.error(err))

    document.getElementById("add-patient").addEventListener("click",()=>{

    })



})