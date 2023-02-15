export default function Notes (token){
    fetch("http://localhost:8081/notes",{
    method:"POST",
    Headers:{
        "Authorization":"Bearer "+ token,
        "Content-Type":"application/json"
    }
});
}