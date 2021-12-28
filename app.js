var main = document.getElementById('mainList')
var inputValue = document.getElementById('inp')
// console.log(firebase)

// console.log(nmes)
firebase.database().ref("todos").on("child_added",function(data){
    // if(JSON.parse(localStorage.getItem(nms)) != nmes){
    //     localStorage.setItem("nms",JSON.stringify(nmes))
    // }

    // console.log(nmenode)
    // var nmenode = document.createTextNode(data.val().nme + ":")
    // var usernme = document.createElement("p")
    // usernme.setAttribute("class","usrnme")
    // usernme.appendChild(nmenode)
    
    var finalText = document.createTextNode(data.val().value)
    var list = document.createElement('p')
    list.setAttribute('class','list')
    // list.appendChild(usernme)
    list.appendChild(finalText)
    main.appendChild(list)
    
    
    var btnDiv = document.createElement('div')
    var btn = document.createElement('button')
    btn.setAttribute('class' , 'btn1')
    btn.setAttribute('id' , data.val().key)
    btn.setAttribute('onclick', 'deleteTODO(this)')
    var btntext = 'Delete'
    var finalbtntext = document.createTextNode(btntext)
    btn.appendChild(finalbtntext)
    

    var editbtn = document.createElement('button')
    editbtn.setAttribute('class' , 'btn1')
    editbtn.setAttribute('id' , data.val().key)
    editbtn.setAttribute('onclick', 'edit(this)')
    var editbtntext = 'Edit'
    var finaleditbtntext = document.createTextNode(editbtntext)
    editbtn.appendChild(finaleditbtntext)






    btnDiv.appendChild(btn)
    btnDiv.appendChild(editbtn)
    list.appendChild(btnDiv)


})
function add() {
    if(inputValue.value == ""){
        return(alert("Please Write Something!!"))     
    }
    
    var text = inputValue.value
    var database = firebase.database().ref("todos")
    var key = database.push().key
    
    var todo = {
        value: text,
        key: key
        
    }
    
    database.child(key).set(todo)
    inputValue.value = ''

    
    // console.log(list.value)
}
function deleteTODO(e){
    firebase.database().ref("todos").child(e.id).remove()
    var li = e.parentNode.parentNode
    li.remove()
    // console.log(e.id)
}
function edit(e){
    var editText = prompt('enter edit text')
    var li = e.parentNode.parentNode
    var edittood = {
        value: editText,
        key: e.id
    }
    console.log(edittood)
    firebase.database().ref("todos").child(e.id).set(edittood)
    li.firstChild.nodeValue = editText
}
function deleteAll(){
    firebase.database().ref("todos").remove()
    main.innerHTML = ''
}

// console.log(firebase.database)