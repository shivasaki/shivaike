
var firestore = firebase.firestore();

const docRef = firestore.collection("subjects");
const subj = document.querySelector("#subj");
const prof = document.querySelector("#prof");
const type = document.querySelector("#type");
const rate = document.querySelector("#rate");
const atnd = document.querySelector("#atnd");
const text = document.querySelector("#text");
const test = document.querySelector("#test");
const cmnt = document.querySelector("#cmnt");
const saveButton = document.querySelector("#saveSubjectButton");

saveButton.addEventListener("click", function () {
    const subjToSave = subj.value;
    const profToSave = prof.value;
    const typeToSave = type.value;
    const rateToSave = rate.value;
    docRef.add({
        name: subjToSave,
        professor: profToSave,
        rating: rateToSave,
        type: typeToSave,
    }).then(function () {
        console.log("Status saved");
    }).catch(function (error) {
        console.log("got error", error);
    }
    )
}
);
