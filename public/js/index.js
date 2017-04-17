$(document).ready(function () {
    makeTemplates();
    userList.show('');
    userInfo.show(dummyData);
    eventsBar.show(dummyData);
    historyBar.show(dummyData);
    alphabets.show();

})
var helper = {
    filter: ''
}

var userList = new function () {
    this.show = function (data) {
        if (data) {
            rb('.usersList', 'userBar', data, helper, '.userNameAndPhone', function (cls, data) {
                $('.userNameAndPhone').css("background", "white");
                $(cls).css("background", "royalblue");
                //console.log(data);
                $('.selectedUserInfo .name').html(data.name);
                userInfo.show(data);
                eventsBar.show(data);
                historyBar.show(data);

            });
        } else {
            rb('.usersList', 'userBar', users, helper, '.userNameAndPhone', function (cls, data) {
                $('.userNameAndPhone').css("background", "white");
                $(cls).css("background", "royalblue");
                //console.log(data);
                $('.selectedUserInfo .name').html(data.name);
                userInfo.show(data);
                eventsBar.show(data);
                historyBar.show(data);

            });
        }
    }
}

// $('.search .inputName').keyup(function(e){
//         var text=$('.search .inputName').val().toLowerCase();
//         var len=$('.usersList .userNameAndPhone').length*3;
//         if(text==''){
//             userList.show('');
//         }
//         else{
//             for(var i=0; i<=len; i++){
//                 var data=$('.usersList .userNameAndPhone:nth-child('+i+').userName').text().toLowerCase();
//                 if(data.includes(!text)){
//                     $('.usersList .userNameAndPhone:nth-child('+i+').userName').hide();
//                 }
//             }
//         }
//     })
$('.search .inputName').on('keyuo click input', function () {
    if ($(this).val().length > 0) {
        $('.usersList .userNameAndPhone').show().filter(function () {
            return $(this).find('.userName').text().toLowerCase().indexOf($('.inputName').val().toLowerCase()) == -1;
        }).hide();
    } else {
        $('.usersList .userNameAndPhone').show();
    }
})

var userInfo = new function () {
    this.show = function (data) {
        if (data) {
            rb('.userInfo', 'userInfo', data);
        }
        //console.log(data);
    }
}

var eventsBar = new function () {
    this.show = function (data) {
        if (data) {
            //console.log(data);
            rb('.events', 'events', data);
        }

    }
}

var historyBar = new function () {
    this.show = function (data) {
        if (data) {
            rb('.historyContainer', 'history', data);
        }
    }
}

var alphabets = new function () {
    this.show = function () {
        var helper = {
            selectAlphabet: selectAlphabet
        }
        rb('.alphabetsBar', 'alphabets', alphabetJson, helper);

        function selectAlphabet(ev, eventArgs) {
            var dataItem = $.view(ev.target).data;
            $('.alphabet').css("background", "whitesmoke");
            $(ev.target).css("background", "white");
            //console.log(dataItem.letter);
            var localData=[];
            for (var i = 0; i < users.length; i++) {
                if (dataItem.letter == users[i].name.substr(0, 1)){
                    localData.push(users[i]);
                }
            }
            userList.show(localData);
        }
    }
}

// var usersData=JSLINQ(users).OrderBy(function(items){
//     return items.name;
// })

bind('.option', function () {
    $('.option').css("color", "gray");
    $(this).css("color", "black");
    console.log(this.innerHTML);
    if (this.innerHTML == "Alphabetically") {
        helper.filter = '';
        var data = JSLINQ(users).OrderBy(function (items) {
            return items.name;
        })
        userList.show(data.items);
    } else if (this.innerHTML == "Latest Added") {
        helper.filter = '';
        var data = JSON.parse(JSON.stringify(users));
        userList.show(data.reverse());
    } else {
        helper.filter = true;
        userList.show(users);
    }
})