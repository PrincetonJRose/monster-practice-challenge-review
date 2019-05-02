const limit = 5
let page = 1
let div = document.getElementById('monster-container')
let array = []

document.addEventListener('DOMContentLoaded',()=>{

    let forward = document.getElementById('forward')
    let back = document.getElementById('back')

    forward.addEventListener('click',(e)=>{
        handleButtons('forward',e)
    })
    back.addEventListener('click',(e)=>{
        handleButtons('back',e)
    })

    document.getElementById('sort').addEventListener('click',handleSort)
    document.getElementById('form').addEventListener('submit',handleForm)
    fetchMonsters(limit,page)
})

function handleSort(){
    let sortedArray = array.sort(((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
    
    removeChild(div)
    sortedArray.forEach((monster)=>{
        renderMonsters(monster)
    })
}

function handleForm(e){
    e.preventDefault()
    console.log(e.target.name.value)

    let newMonster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.desc.value
    }
    e.target.reset()
    insertMonsters(newMonster)
}

function handleButtons(type,e){
    if(type==='forward'){
        page+=1
    }else{
        if(page!=1){
            page-=1
        }
    }
    removeChild(div)
    fetchMonsters(limit,page)
}

function removeChild(node){
    array = []
    while(node.firstChild){
        node.removeChild(node.firstChild)
    }
}

function insertMonsters(newMonster){
    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
}

function fetchMonsters(limit,page){
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then((res)=>res.json())
    .then((data)=> data.forEach((monster)=>{
        array.push(monster)
        renderMonsters(monster)
    }))
    .catch((error)=>console.log(error))
    console.log(array)
}

function renderMonsters(monster){
    let monsterCard = document.createElement('div')
    
    let name = document.createElement('h2')
    name.innerText = monster.name

    let age = document.createElement('h4')
    age.innerText = monster.age

    let description = document.createElement('p')
    description.innerText = monster.description

    monsterCard.appendChild(name)
    monsterCard.appendChild(age)
    monsterCard.appendChild(description)
    div.appendChild(monsterCard)
}