
var config = {
    apiKey: "AIzaSyBfPXiOjJs3AtXHQwTshNqSwmQU7Ibv2Rw",
    authDomain: "r-t-b-4e91f.firebaseapp.com",
    databaseURL: "https://r-t-b-4e91f.firebaseio.com",
    projectId: "r-t-b-4e91f",
    storageBucket: "r-t-b-4e91f.appspot.com",
    messagingSenderId: "534319705104"
};
var firestore = firebase.firestore();
var sub_id = location.hash.slice(1);
var subject = {}
const docRef = firestore.collection("subjects").doc(sub_id);
$(function () {
    docRef.get()
        .then((doc) => {
            subject = doc.data()
        }).then(() => {
            $("#detail").append(_.template(template_detail, subject));
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
})

var template_detail = [
    '<% subject = subject %>',
    '<section style="text-align:center; padding-top:0px; padding-bottom:0px;">',
    '<h4>科目名:<span class="bold"><%- subject.name %></span></h4>',
    '<h4>教授名:<span class="bold"><%- subject.professor %></span></h4>',
    '<h4>専門科目/一般教養：<%- subject.type %></h4>',
    /*'<div class="star-rating">',
    '<div class="star-rating-front">★★★★★</div>'
    < div class= "star-rating-back" >★★★★★</div >
    </div >*/
    '</section >'
].join("");



/*
window.onhashchange = function () {
    if (location.hash == "") {
        alert("ブラウザバックが一度だけ禁止されます");
    }
};
*/
$(function () {
    // モーダルウィンドウが開くときの処理    
    $(".modalOpen").click(function () {
        var navClass = $(this).attr("class"),
            href = $(this).attr("href");
        $(href).fadeIn();
        $(this).addClass("open");
        return false;
    });
    // モーダルウィンドウが閉じるときの処理    
    $(".modalClose").click(function () {
        $(this).parents(".modal").fadeOut();
        $(".modalOpen").removeClass("open");
        return false;
    });
});

$(function () {
    const atnd = document.querySelector("#atnd");
    const txbk = document.querySelector("#txbk");
    const midt = document.querySelector("#midt");
    const fint = document.querySelector("#fint");
    const eqpm = document.querySelector("#eqpm");
    const radio_group = document.getElementsByName("rating");
    var rate = 0;

    const cmnt = document.querySelector("#cmnt");
    const form_submit = document.querySelector("#form-submit");
    form_submit.addEventListener("click", function () {
        for (var a = "", i = radio_group.length; i--;) {
            if (radio_group[i].checked) {
                a = radio_group[i].value;
                console.log(a)
                break;
            }
        }
        if (a === "") {
        } else {
            rate = Number(a)
        }
        const atndToSave = atnd.value;
        const txbkToSave = txbk.value;
        const midtToSave = midt.value;
        const fintToSave = fint.value;
        const eqpmToSave = eqpm.value;
        const cmntToSave = cmnt.value;
        const rateToSave = rate;
        docRef.collection("reviews").add({
            attendance_check: atndToSave,
            text_book: txbkToSave,
            mid_test: midtToSave,
            fin_test: fintToSave,
            equipment: eqpmToSave,
            comment: cmntToSave,
            rating: rateToSave,
        }).then(function () {
            console.log("Status saved");
            location.reload()
        }).catch(function (error) {
            console.log("got error", error);
        })
    });
})

var reviews = []
$(function () {
    docRef.collection("reviews").limit(10).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                reviews.push(doc.data());
            })
        })
        .then(() => {
            $("#reviews").append(_.template(template_reviews, reviews));
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
})

var template_reviews = [
    "<% _.each(reviews, function(val, i) { %>",
    '<div class="detail">',
    '<div style="display:inline-block; margin-right: 10px;">',
    '<h3 class="midasi">出席：</h3>',
    '<p class="midasi"><%- val.attendance_check %></p>',
    '</div>',
    '<div style="display:inline-block; margin-right: 10px;">',
    '<h3 class="midasi">教科書：</h3>',
    '<p class="midasi"><%- val.text_book %></p>',
    '</div>',
    '<div style="display:inline-block; margin-right: 10px;">',
    '<h3 class="midasi">テスト</h3>',
    '<p class="midasi">中間：<%- val.mid_test %>&nbsp;&nbsp;</p>',
    '<p class="midasi">期末：<%- val.fin_test %>&nbsp;&nbsp;</p>',
    '<p class="midasi">持ち込み：<%- val.equipment %>&nbsp;&nbsp;</p>',
    '</div>',
    '<div style="display:inline-block; margin-right: 10px;">',
    '<h3 class="midasi">コメント</h3>',
    '<p class="midasi"><%- val.comment %></p>',
    '</div>',
    '<div>',
    '<h3 class="midasi">楽単度：</h3>',
    '<p class="midasi"><%- val.rating %></p>',
    /*'<div class="star-rating">',
    '<div class="star-rating-front">★★★★★</div>',
    '<div class="star-rating-back">★★★★★</div>',
    "</div>",*/
    '</div>',
    '</div>',
    "<% }) %>",
].join("");