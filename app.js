let day = document.querySelector("#day")
let date = document.querySelector("#date")
let entry = document.querySelector("#add")
let add = document.querySelector(".add-item")
let list = document.querySelector(".list")
let search = document.querySelector("#search")
let todoform = document.querySelector(".form")




const d = new Date();
const days = ["sunday" , "monday" ,"tuseday" , "wendsday" , "thursday","friday" , "saturday"]
day.innerText = days[d.getDay()] + " 'Today ";


let option = {month : "long" , day : "numeric" , year : "numeric"}
let today = new Date();
date.innerHTML = today.toLocaleDateString("en-US",option)




todoform.addEventListener("submit",e=>{
    e.preventDefault();
    Todo = entry.value;
    if(!entry.value){
        alert("Please Enter A Task At Least");
    }
    else{
        insertToDo(Todo)
        storeToLocalStorage(Todo)
    }
})


function insertToDo(data){
    let todoLI = document.createElement("li");
    todoLI.innerHTML = `
    <p>${data}</p>
    <div class="options">
        <span class="todocheck"><i class="fa fa-check"></i></span>
        <span class="todoedit"><i class="fa fa-edit"></i></span>
        <span class="todotrash"><i class="fa fa-trash"></i></span>
    </div>`
    list.appendChild(todoLI);
    entry.value = "";                      
}

search.addEventListener("input",e=>{
    console.log(list)
    Array.from(list.children).forEach(element=>{
        if(!element.querySelector("p").innerText.toLowerCase().includes(e.target.value.toLowerCase())){
            element.style.display = "none";
        }else{
            element.style.display = "flex";
        }
    })
})


function storeToLocalStorage(data){
    let todoArr;
    if(localStorage.getItem('todos') === null){
        todoArr=[]
    }else{
        todoArr = JSON.parse(localStorage.getItem('todos'))
    }
    todoArr.push(data);
    localStorage.setItem('todos',JSON.stringify(todoArr))
}

function DisplayDatafronlocalstorage(){
    let todoArr = JSON.parse(localStorage.getItem('todos'))
    for(todo of todoArr){
        insertToDo(todo);
    }
}


document.addEventListener('DOMContentLoaded',DisplayDatafronlocalstorage)


// let text = '{ "employees" : [' +
// '{ "firstName":"John" , "lastName":"Doe" },' +
// '{ "firstName":"Anna" , "lastName":"Smith" },' +
// '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
// console.log(text)
// const obj = JSON.parse(text);
// console.log(obj)

// console.log(JSON.parse(localStorage.getItem('todos')))

list.addEventListener("click",e=>{
    tododelete(e.target)
    todoedit(e.target)
    todoDone(e.target)

})
function tododelete(element){
    // if(data.getAttributeNode("class").value == "fa fa-trash" && data.tagName == "I"){
    //     console.log('yes')
    // }
    if(element.classList.contains('fa-trash') || element.classList.contains('todotrash')){
        let liE1 = element.closest("li");
        // liE1.classList.add("bounceOutDown")
        // setTimeout(()=>{
        //     liE1.remove()
        // },1000);
        liE1.remove()
        deleteFormLocalStorge(element);

    }
}

function deleteFormLocalStorge(el){
    let todoArr = JSON.parse(localStorage.getItem('todos'));
    let todoo = el.closest("li");
    let todoDelete = todoArr.filter(todo=>todoo.textContent.trim() !== todo);
    localStorage.setItem('todos',JSON.stringify(todoDelete))
}


function todoedit(data){
    if(data.classList.contains("fa-edit")|| data.classList.contains("todoedit")){
        liE1 = data.closest("li")
        entry.value = liE1.textContent.trim();
        liE1.remove();
        deleteFormLocalStorge(data);
    }
}
function todoDone(data){
    if(data.classList.contains("fa-check") || data.classList.contains("todocheck")){
        liE1 = data.closest("li");
        liE1.children[0].classList.toggle("line")
        liE1.classList.toggle("opacity")
        // liE1.classList.add("completed")
        // liE1.classList.add('rotateOutDownLeft')
        // liE1.addEventListener("transitionend",e=>{
        //     liE1.remove()
        // })
        // deleteFormLocalStorge(data);

    }
}




