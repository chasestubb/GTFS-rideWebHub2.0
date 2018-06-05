var user;
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1].replace(/['"]+/g, '');}
       }
       return(false);
}

$(document).ready(function () {
  $(document).ajaxStart(function () {
      $("#loading").show();
  }).ajaxStop(function () {
      $("#loading").hide();
  });
  $('#import_table_id').DataTable({
    "ordering": false,
    "info":     false,
    "searching": false,
    "paging":   false,

  });
  $('#table_id').DataTable( {
    serverSide: true,
    "ordering": false,
    "info":     false,
    "searching": false,
    ajax: {
        url: '/getHistoryTableData',
        dataSrc: "data",
        type: 'POST'
    }
} );
user = getQueryVariable("User");
console.log("User: ",user);

$('#uploadForm').submit(function() {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            url:'/loadFeed/'+user+'/',
            error: function(xhr) {
            $("#status").empty().text(response);
                console.log('Error: ' + xhr.status);
            },
            success: function(response) {
                $("#status").empty().text(response);
                console.log(response);
            }
    });
    
        //Very important line, it disable the page refresh.
    return false;
    });    

});


function test() {
  $.ajax({
    url : "upload",
    async:"false",
    type: "POST",
    dataType: "json",
    data:{},
    success : function (data) {
        alert(data);
    }
});
}

function showHistory(){
    var load = document.getElementById("LoadPanel");
    load.style.display = "none";
    var panel = document.getElementById("ImportPanel");
    panel.style.display = "none";
    var history = document.getElementById("historyPanel");
    history.style.display = "block";
    console.log("Showing History");
}
function showLoader(){
    var panel = document.getElementById("ImportPanel");
    panel.style.display = "none";
    var history = document.getElementById("historyPanel");
    history.style.display = "none";
    var load = document.getElementById("LoadPanel");
    load.style.display = "block";
    console.log("Showing History");
}

function showImport(){
    var load = document.getElementById("LoadPanel");
    load.style.display = "none";
    var history = document.getElementById("historyPanel");
    history.style.display = "none";
    var panel = document.getElementById("ImportPanel");
    panel.style.display = "block";
    console.log("Showing Import");
}