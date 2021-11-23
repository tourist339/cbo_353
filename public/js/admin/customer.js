import {fillAddicitonsList} from "../base.js";

let allCustomersList={}

const fillCustomersTable=(data)=>{
    let customersTable=document.getElementById("all-customers-table")
    customersTable.innerHTML=`
      <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Addiction Kind</th>
            <th>Links</th>
        </tr>
    `

    data.forEach(customer=>{

        let singleRow=document.createElement("tr")
        singleRow.innerHTML=`
                <td>${customer.username}</td>

                <td>${customer.firstname}</td>

                <td>${customer.lastname}</td>
                <td>${customer.addiction_type}</td>
                <td>
                <a class="classic-btn" href="/admin/staff?id=${customer.id}">View</a>
                <button class="classic-btn">Delete</button></td>`
        customersTable.appendChild(singleRow)
    })
}
const getAllCustomers=()=>{
    fetch("/admin/getAllCustomers",{
        method:"GET"
    }).then((response)=>response.json())
        .then(data=>{

            console.log(data)
            allCustomersList=data
            fillCustomersTable(data)

        })
        .catch(err=>console.error(err))
}
window.addEventListener("load",()=>{
    getAllCustomers()
    document.getElementById("input-search-text").addEventListener("input",e=>{
        console.log("Fds")
        let filterUsername=e.target.value
        let filteredCustomerList=[]

        for (let i = 0; i < allCustomersList.length; i++) {
            let customer=allCustomersList[i]
            if(customer.username.includes(filterUsername)){
                filteredCustomerList.push(customer)
            }
        }
        fillCustomersTable(filteredCustomerList)



    })


})