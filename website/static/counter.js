const addButton = document.getElementById('add');
const subButton = document.getElementById('subtract');
const input = document.getElementById('input');
let num;
if (input.value) {
    num = document.getElementById('input').value;
}

console.log(num);

if (addButton) {
    addButton.addEventListener("click", function() {
        
        input.value+=1;
    })
}

if (subButton) {
    subButton.addEventListener("click", function() {
        input.value-=1;
    })
}
