
var firestore = firebase.firestore();
const docRef = firestore.collection("subjects");

var subjects = [];
var data_with_id = [];
docRef.limit(30).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            data_with_id = doc.data();
            data_with_id.id = doc.id
            subjects.push(data_with_id);
        })
    })
    .then(() => {
        $("#subjects").append(_.template(template_index, subjects));
        $('.a_el').on("click", (function () {
            var this_id = $(this).attr("data-doc-id");
            location.href = '/detail.html' + '#' + this_id
        }))
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });


var template_index = [
    '<div class="grid-g">',
    "<% _.each(subjects, function(val, i) { %>",
    '<a class="a_el" data-doc-id="',
    '<%- val.id %>',
    '">',
    '<div id="comp">',
    '<h4>科目名：<span class="bold"><%- val.name %></span></h4>',
    '<h4>教員名：<span class="bold"><%- val.professor %></span></h4>',
    '<h4>専門科目/一般教養：<%- val.type %></h4>',
    "<h4>楽単度：<%- val.rating %></h4>",
    /*'<div class="star-rating">',
    '<div class="star-rating-front">★★★★★</div>',
    '<div class="star-rating-back">★★★★★</div>',
    "</div>",*/
    "</div>",
    "</a>",
    "<% }) %>",
    "</div>",
].join("");