var user;
var myFeedFiles;
var loaded = 0;
var loaded2 = 0;
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
window.onbeforeunload = function(){
    // Do something
     deleteFiles();
 }

 function deleteFiles(){
    $.ajax({
        url : "/deleteFiles/"+user+"/",
        async:"false",
        type: "POST",
        dataType: "json",
        data:{},
        success : function (data) {
            
        }
    });
 }
$(document).ready(function () {
    user = getQueryVariable("User");
    if(user==false){
        $("#topLevel").html("");
        $("#topLevel").html("<h1>No User Session was Found</h1>");
        return;
    }
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

console.log("User: ",user);

$('#uploadForm').submit(function() {
        var myInput = $("#fileSelection");
        loaded = 1;
        /*if (myInput.file == null) {
            $("#status").empty().text("Error: Must Select a File First");
        return false;
        }*/
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
                getFilesLoaded();
            }
    });
    
    //Very important line, it disable the page refresh.
    return false;
    });   
    $('#fileSelection2').change(function(){
        loaded2 = 1;
    });

    $('#uploadForm2').submit(function() {
        var myInput = $("#fileSelection2").val();
        var filecheck = myInput.split("\\").pop();
        console.log("file: "+filecheck);
        var file = $('#createLabel').text();
        console.log("title "+file);

        if (loaded2 == 0) {
            $("#status2").empty().text("Error: Must Select a File First");
        return false;
        }
        console.log("they equal "+(file===filecheck));
        if((file===filecheck)==false){
            $("#status2").empty().text("Error: Must Select file "+file);
            return false;
        }
        
        //console.log(myInput);
        
        console.log("uploading file "+file);
        $("#status2").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            url:'/loadRideFile/'+user+'/'+file,
            error: function(xhr) {
            $("#status2").empty().text(response);
                console.log('Error: ' + xhr.status);
            },
            success: function(response) {
                $("#status2").empty().text(response);
                console.log(response);
                getFilesLoaded();
            }
    });
    
    //Very important line, it disable the page refresh.
    return false;
    });     

});





function updateFileStatus(files){
    var myfileNames = ["agency.txt","stops.txt","routes.txt","trips.txt","stop_times.txt","calendar.txt","calendar_dates.txt",
"fare_attributes.txt","shapes.txt","fare_rules.txt","transfers.txt","frequencies.txt","feed_info.txt","board_alight.txt",
"trip_capacity.txt","ride_feed_info.txt","ridertrip.txt","ridership.txt"];
console.log("update file status");
files.forEach(file => {
    console.log(file);
    if(file == "agency.txt"){
        document.getElementById("agencynotloaded").style.display = "none";
        document.getElementById("agencyloaded").style.display = "block";
    }
    else if(file == "stops.txt"){
        document.getElementById("stopsnotloaded").style.display = "none";
        document.getElementById("stopsloaded").style.display = "block";
    }
    else if(file == "routes.txt"){
        document.getElementById("routesnotloaded").style.display = "none";
        document.getElementById("routesloaded").style.display = "block";
    }
    else if(file == "trips.txt"){
        document.getElementById("tripsnotloaded").style.display = "none";
        document.getElementById("tripsloaded").style.display = "block";
    }
    else if(file == "stop_times.txt"){
        document.getElementById("stop_timesnotloaded").style.display = "none";
        document.getElementById("stop_timesloaded").style.display = "block";
    }
    else if(file == "calendar.txt"){
        document.getElementById("calendarnotloaded").style.display = "none";
        document.getElementById("calendarloaded").style.display = "block";
    }
    else if(file == "calendar_dates.txt"){
        document.getElementById("calendar_datesnotloaded").style.display = "none";
        document.getElementById("calendar_datesloaded").style.display = "block";
    }
    else if(file == "fare_attributes.txt"){
        document.getElementById("fare_attributesnotloaded").style.display = "none";
        document.getElementById("fare_attributesloaded").style.display = "block";
    }
    else if(file == "shapes.txt"){
        document.getElementById("shapesnotloaded").style.display = "none";
        document.getElementById("shapesloaded").style.display = "block";
    }
    else if(file == "fare_rules.txt"){
        document.getElementById("fare_rulesnotloaded").style.display = "none";
        document.getElementById("fare_rulesloaded").style.display = "block";
    }
    else if(file == "transfers.txt"){
        document.getElementById("transfersnotloaded").style.display = "none";
        document.getElementById("transfersloaded").style.display = "block";
    }
    else if(file == "frequencies.txt"){
        document.getElementById("frequenciesnotloaded").style.display = "none";
        document.getElementById("frequenciesloaded").style.display = "block";
    }
    else if(file == "feed_info.txt"){
        document.getElementById("feed_infonotloaded").style.display = "none";
        document.getElementById("feed_infoloaded").style.display = "block";
    }
    else if(file == "board_alight.txt"){
        document.getElementById("board_alightnotloaded").style.display = "none";
        document.getElementById("board_alightloaded").style.display = "block";
    }
    else if(file == "trip_capacity.txt"){
        document.getElementById("trip_capacitynotloaded").style.display = "none";
        document.getElementById("trip_capacityloaded").style.display = "block";
    }
    else if(file == "ride_feed_info.txt"){
        document.getElementById("ride_feed_infonotloaded").style.display = "none";
        document.getElementById("ride_feed_infoloaded").style.display = "block";
    }
    else if(file == "ridertrip.txt"){
        document.getElementById("ridertripnotloaded").style.display = "none";
        document.getElementById("ridertriploaded").style.display = "block";
    }
    else if(file == "ridership.txt"){
        document.getElementById("ridershipnotloaded").style.display = "none";
        document.getElementById("ridershiploaded").style.display = "block";
    }
});

}

function getFilesLoaded(){
    console.log("Checking what files were loaded");
    $.ajax({
        url : "getLoadedFiles/"+user+"/",
        async:"false",
        type: "GET",
        dataType: "json",
        data:{},
        success : function (data) {
            console.log(data.fileNames);
            myFeedFiles = data.fileNames;
            updateFileStatus(data.fileNames);
        }
    });
}


function uploadFeed() {
    if(loaded == 0){
        $("#status").empty().text("Error: Need to load a file...");
        return;
    }
  var feedid = $("#organizationSelector").val();
  var feedName = $("#feedName").val();
  if(feedName == null|| feedName == ""){
        $("#status").empty().text("Error: Need to select a name...");
      return;
  }
  console.log(feedid);
  console.log(feedName);
  console.log("url: "+ "upload/"+user+"/"+feedid+"/"+feedName+"/")

  $.ajax({
    url : "upload/"+user+"/"+feedid+"/"+feedName+"/",
    async:"false",
    type: "POST",
    dataType: "json",
    data:{},
    success : function (data) {
    }
});
}

function saveFile(){
    var file = $('#editLabel').text();
    var contents = $('#editContents').val();
    console.log(file);
    console.log(contents);
    $.ajax({
        url : "saveFile/"+user+"/"+file+"/",
        async:"false",
        type: "POST",
        dataType: "text",
        data:{"mytext":contents},
        success : function (data) {
            console.log(data);
            $("#saveStatus").empty().text("");
            $("#saveStatus").empty().text(data);
        }
    });
}

function showEdit(file){
    $('#editLabel').html(file);
    var panel = document.getElementById("ImportPanel");
    panel.style.display = "none";
    //retrieve the file content with ajax call
    $.ajax({
        url : "getFile/"+user+"/"+file+"/",
        async:"false",
        type: "GET",
        dataType: "text",
        data:{},
        success : function (data) {
            $('#editContents').val(data);
        }
    });

    var history = document.getElementById("editPanel");
    history.style.display = "block";
    console.log("Showing Edit");
}

function placeDownload(){
    console.log("place download");
    var div = $("#downloadLink");
    var file = $('#createLabel').text();
    div.html("<a>"+file+"</a>");
}

function showCreate(file){
    $('#createLabel').html(file);
    $('#templateLoad').html(file);
    if(file=="board_alight.txt"){
        document.getElementById('board_alight_download').style.display = "block";
    }
    else if(file=="ridership.txt"){
        document.getElementById('ridership_download').style.display = "block";
    }
    else if(file=="ridertrip.txt"){
        document.getElementById('ridertrip_download').style.display = "block";
    }
    else if(file=="trip_capacity.txt"){
        document.getElementById('trip_capacity_download').style.display = "block";
    }
    else if(file=="ride_feed_info.txt"){
        document.getElementById('ride_feed_info_download').style.display = "block";
    }
    var panel = document.getElementById("ImportPanel");
    panel.style.display = "none";
    var history = document.getElementById("createPanel");
    history.style.display = "block";
    console.log("Showing create");
}

function backToLoad(){
    document.getElementById('board_alight_download').style.display = "none";
    document.getElementById('ridership_download').style.display = "none";
    document.getElementById('ridertrip_download').style.display = "none";
    document.getElementById('trip_capacity_download').style.display = "none";
    document.getElementById('ride_feed_info_download').style.display = "none";
    var panel = document.getElementById("editPanel");
    panel.style.display = "none";
    $("#saveStatus").empty().text("");
    var panel = document.getElementById("createPanel");
    panel.style.display = "none";
    var history = document.getElementById("ImportPanel");
    history.style.display = "block";
    $('#fileSelection2').val(null);
    loaded2 = 0;
    $("#status2").empty().text("");
    console.log("Showing Import");
}

function showHistory(){
    location.reload();
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