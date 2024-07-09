const addBtn = document.querySelector("#addBtn")          //it will access the addbtn button dynmically
const main = document.querySelector("#main")
addBtn.addEventListener(                  //on click this will call a funcn which call addNote()
    "click",  
    function() {
        addNote()            
    }
)
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");               //saare textarea ko notes vale variable m daal diya
    // console.log(notes);
    const data = [];                //empty array bnaya data naam s
    notes.forEach(
            (note) => {
                data.push(note.value)                    //used to add the value of a variable called note to an array called data
            }
        )
        // console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))      // to store an array called data in local storage as a string after converting it to JSON format(easy to read) using JSON.stringify().
    }
}


//  <div class="note">
// <div class="tool">
//     <i class="fas fa-save"></i>
//     <i class="fas fa-trash"></i>
// </div>
// <textarea></textarea>
// </div>

const addNote = (text = "") => {                               //text is empty
    const note = document.createElement("div");                  //note will create a div box
    note.classList.add("note")                              //The classList.add() method in JavaScript is used to add one or more classes to the list of classes for a given element.
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>                 
    `;                                     //text area is now dynamic we can write anything on it also we have 2 classes in it

    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes()
        }
    )
    main.appendChild(note);
    saveNotes()
}


(
    function() {                                    //is used to retrieve data from the localStorage named "notes," parse it from a JSON string format into a JavaScript object, and store it in a variable named lsNotes
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {                 
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()