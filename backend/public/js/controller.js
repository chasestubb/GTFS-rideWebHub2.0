$(document).ready(function () {
  $(document).ajaxStart(function () {
      $("#loading").show();
  }).ajaxStop(function () {
      $("#loading").hide();
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