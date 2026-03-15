const SUPABASE_URL = "TU_SUPABASE_URL"
const SUPABASE_KEY = "TU_ANON_KEY"

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)

const MAX_WALLETS = 1000


document
.getElementById("btnRegistrar")
.addEventListener("click", registrarWallet)


async function iniciar(){

const { error } = await supabase.auth.signInAnonymously()

if(error){

console.log(error)

return

}

contarWallets()

}


async function registrarWallet(){

const wallet =
document.getElementById("wallet").value.trim()

if(wallet.length < 10){

mensaje("Wallet inválida")

return

}

const { error } = await supabase
.from("wallets")
.insert([{ wallet }])

if(error){

mensaje("Wallet ya registrada")

}else{

mensaje("Wallet registrada 🎉")

document.getElementById("wallet").value=""

contarWallets()

}

}


async function contarWallets(){

const { count } = await supabase
.from("wallets")
.select("*",{count:"exact",head:true})

document.getElementById("contador").innerText = count

let progreso = (count / MAX_WALLETS) * 100

document
.getElementById("barra")
.style.width = progreso + "%"

}


function mensaje(texto){

document.getElementById("mensaje").innerText = texto

setTimeout(()=>{

document.getElementById("mensaje").innerText=""

},4000)

}


iniciar()
