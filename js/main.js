const getDataURL = "https://script.google.com/macros/s/AKfycby-nlF9e1MFfmbA8MdySasIk8TMSVJD_Tf8IE6RqP1YtFYi5es/exec";
let imgAry = new Array();
let html;

//---------------------讀取資料------------------//
$(document).ready(function(){
    $.get(getDataURL,function(data){
        imgAry = data;
        setData();
    });
});

function setData(){
    let tmp = $('#template01');
    for(var i=0;i<imgAry.length;i++){
        let htmlCont = tmp.html();
        htmlCont = htmlCont.replace("BREEDER",imgAry[i][0]);
        htmlCont = htmlCont.replace("PETNAME",imgAry[i][1]);
        htmlCont = htmlCont.replace("TYPE",imgAry[i][2]);
        htmlCont = htmlCont.replace("YEARS",imgAry[i][3]);
        htmlCont = htmlCont.replace("GENDER",imgAry[i][4]);
        htmlCont = htmlCont.replace("IMG_HERE",imgAry[i][5]);
        htmlCont = htmlCont.replace("MESSAGE",imgAry[i][6]);
        // htmlCont = htmlCont.replace("petName",(imgAry[i][7].substr(0, 10)));
        $('#show').append(htmlCont);
    }
}

//------------------------寫入------------------------//
function sendData(){
    let parameter = new Object();
    let postURL = "https://script.google.com/macros/s/AKfycbwupVBJbTZGDAeC92FDB3SEXFkUpTg2_V2HpPRg8D1hM_DguN4/exec";
    parameter.method = "write1";
    parameter.url = "https://docs.google.com/spreadsheets/d/1BPkbgRMuCrYx0_ssSMS4F6fguD_Pz19TQZA7RgcsE4Q/edit?usp=sharing";
    parameter.tag = "工作表1";
    parameter.breeder = $("#breeder").val();
    parameter.petName = $("#petName").val();
    parameter.type = $("#type").val();
    parameter.years = $("#years").val();
    parameter.gender = $('input[name*=gender]:checked').val();
    parameter.picture = $("#picture").val();
    parameter.message = $("#message").val();

    if(parameter.breeder=="" || parameter.petName=="" || parameter.type=="" || parameter.years=="" || parameter.gender=="" || parameter.picture=="" || parameter.message==""){
        alert("所有欄位皆為必填！");
    }else{
    // console.log(parameter); //debug
    $.get(postURL, parameter, (data)=> {
        if(data.result=="資料建立成功"){
            alert("寫入成功！");
            window.location.reload();
        }else{
            alert("寫入失敗！");
        }
    });
    }
}