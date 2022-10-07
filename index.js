let datos = []
const input = document.querySelector(".input_join")
const containerData = document.querySelector(".containerData")
const titulo = document.querySelector(".Server-title")
const tituloError = document.querySelector(".Server-title-error")
const motd = document.querySelector(".motd-all")
const players = document.querySelector(".players-all")
const version = document.querySelector(".version-all")
const clickme = document.querySelector(".clickme")
const information = document.querySelector(".information-all")
const ServerIcon = document.querySelector(".ServerIcon")
const icono = document.querySelector('link[rel="icon"]')
//
const addServer = document.querySelector(".recents")
//

let iniciador = [titulo,motd,players,version]
async function statusMinecraft(){
    information.innerHTML = ""
    containerData.style.visibility = "hidden"
    if(input.value == "" || input.value.startsWith(" ") || input.value.includes("<") || input.value.includes(">")){
        tituloError.textContent = "Servidor no disponible"
        tituloError.style.visibility = "visible"
        tituloError.style.position = "none"
    }
    
    else{
        let servidor = input.value
        let serverData = await fetch(`https://api.mcsrvstat.us/2/${servidor}`)
        
        let dato = await serverData.json()
        ShowData(dato)

    }
}
ShowData = (response) =>{
    if(response.ip == "127.0.0.1" || response.online == false){
        tituloError.textContent = "No se pudo completar el proceso(revisa la ip introducida)."
        tituloError.style.visibility = "visible"
        tituloError.style.position = "none"
    }else{
        tituloError.style.position = "absolute"
        tituloError.style.visibility = "hidden"
        if(datos.includes(input.value)){
            console.log("no entra porque se repite")
        }else{
            if(datos.length > 4){
                datos.shift()
                datos.push(input.value)
                recientes(input.value)
            }else{
                datos.push(input.value)
                recientes(input.value)
            }
        }
        ServerIcon.setAttribute("src", response.icon)
        titulo.textContent = ` ${input.value}`
        motd.innerHTML = `: ${response.motd.html}`
        //aprendi que no puedo visitar algo que no existe dentro de algo que no existe y decir si existe
        if(typeof(response.info) === "undefined"){
            information.textContent = "No hay información disponible"
        }else{
            information.style.visibility = "visible"
            for (infoData of response.info.html){
                information.innerHTML += `<li>${infoData}<li>`
            }
        }
        icono.setAttribute("href", response.icon)
        containerData.style.visibility = "visible"
        players.textContent = `: ${response.players.online} / ${response.players.max}`
        version.textContent = `: ${response.version}`
        // $("version-all").html(`: ${response.version}`)
    }
}

// clickme.addEventListener("onclick", console.log("Hola"))
clickme.addEventListener("click", statusMinecraft)
recientes = () =>{
    addServer.innerHTML = ""
    datos.forEach(joinDatos =>{
            let li = document.createElement("LI")
            li.textContent = joinDatos
            addServer.appendChild(li)
    })
}