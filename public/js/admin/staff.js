window.addEventListener("load",()=>{
    alert("Fds")
    fetch("/admin/getAllStaff",{
        method:"GET"
    }).then((response)=>response.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))

    fetch("/getAllAddictions",{
        method:"GET"
    }).then((response)=>response.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))
})