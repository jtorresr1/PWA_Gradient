if("serviceWorker" in navigator){
    navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro Exitoso"))
    .catch((error) => console.log(error));
}