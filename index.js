let myLeads = []
// use "const", instead of "Let". when it's constant
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const unEl = document.getElementById("ul-el")

// to get form local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a href='" + myLeads[i] + "' target = '_blank'>"+myLeads[i]+"</a></li>""
        // the above line can be made easier using "template string"
        listItems += `
            <li>
            <a href='${leads[i]}' target = '_blank' >${leads[i]}</a>
            
            </li>
        `
    }
    // .innerHTML = to access html code
    unEl.innerHTML = listItems


}
tabBtn.addEventListener("click",function(){
    // chrome api to get access to tab url
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        // here "tabs", be like tabs=[{url: "https://www.youtube.com"}]
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})



deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
    
})
// adding .addEventListener
inputBtn.addEventListener("click",function(){
    // use ".value", to get value in input text box
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // localstorage.
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})




