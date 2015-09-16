//Learning CPS
function firstChar(str, ret){
    ret(str[0]);
}

firstChar("Nathaniel", function(x){
    console.log(x);
});


function lastChar(str, ret){
    ret(str[str.length-1]);
}

lastChar("Nathaniel", function(x){
    console.log(x);
});

function getFirstAndLast(str, ret){
    var l1;
    var l2;
    firstChar(str, function(x){
        l1 = x;
    });
    lastChar(str, function(x){
        l2 = x;
    });
    ret(l1+l2);
}

getFirstAndLast("Nathaniel", function(x){
    console.log(x);
});