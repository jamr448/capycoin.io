const SUPABASE_URL = "https://rnoamoyadtbjueyuitsr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub2Ftb3lhZHRianVleXVpdHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDY3NjksImV4cCI6MjA4ODkyMjc2OX0.7xUbwD_pD2znL66S6BModS8rrjQjWubRaFXyB294pSA"

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
