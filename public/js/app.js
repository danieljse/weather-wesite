
/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

*/

const weather_form = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#Message1')

const msg2 = document.querySelector('#Message2')
//msg1.textContent = "hola que hace"


weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    url = '/weather?address='+location

    msg1.textContent = "Loading"
    msg2.textContent = ""

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
            
        console.log(data.error)
        }else{
        msg1.textContent = "Location: " + data.location
        msg2.textContent = "Forecast: " + data.forecast
        console.log(data.location)
        console.log(data.forecast)
        }
    })
})




})

