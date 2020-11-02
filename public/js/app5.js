console.log('client side javascript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')

weatherForm.addEventListener('submit',(e)=> { 
    e.preventDefault()
    const location2 = search.value
     message1.textContent = ' Loading....'
     message2.textContent = ' '

    fetch('/weather?search='+location2).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
        })

    
})
