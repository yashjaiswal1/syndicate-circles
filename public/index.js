/*var submitBtn = document.getElementById("submitBtn");
var heading = document.getElementById("heading");
function submitClick(){
    var firebaseRef = firebase.database().ref();

    firebaseRef.child("some key").set("some value");
    
    firebaseRef.child("name").on('value',function(snapshot){
        heading.innerHTML = snapshot.val();
    });
}*/

// (1) Add new field in dataTable (Agents) once a user registers via the mobile app and display it in the dataTable
var dbRefObject = firebase.database().ref().child("Agent");

dbRefObject.on('child_added',function(snapshot){
    var obj = snapshot.val();
    fnClickAddRow(obj);
});
alert = function() {};
function fnClickAddRow(obj) {
    //performance = ( leads converted * lead multiplier ) + product priority
    //performance difference = ( p(current week) - p(previous week) ) / p(current week) * 100
    var multiplier = 1.25; 
    var priority = 0;
    var performance = (Number(obj.leadConverted) * multiplier) + priority;
    var diff = (( (performance - 45) / performance ) * 100).toFixed(2);
    if(performance == 0){diff = 0}
    $('#example').dataTable().fnAddData( [
		obj.name,
        obj.state,
        obj.email,
        obj.leadConverted,
        obj.lead,
        diff + "%",
        obj.payment
         ] );
    
}

// (1.5) Real-time updation of payment request
/*dbPayment = firebase.database().ref().child('Agent');

dbPayment.on("child_changed",function(snap){
    snap.val().payment.update();
});*/

// (2) Add new field in dataTable (Leads) upon logging the lead data from the mobile app and display it in the dataTable
var dbRefLead = firebase.database().ref().child("Leads");

dbRefLead.on('child_added',function(snapshot){
    var obj = snapshot.val();
    fnAddRow(obj);
});
alert = function() {};
function fnAddRow(obj) {

    $('#example2').dataTable().fnAddData( [
		obj.name,
        obj.refer,
        obj.age,
        obj.email,
        obj.product,
        obj.date
         ] );
}


// (3) Setting priority
dbRefProd = firebase.database().ref();


function changePriority(){
    dbRefProd.child("Products").child("Agricultural_Loans").child("priority").set(document.getElementById("prod3").value);
    dbRefProd.child("Products").child("CASA").child("priority").set(document.getElementById("prod4").value);
    dbRefProd.child("Products").child("Corporate_Finance").child("priority").set(document.getElementById("prod8").value);
    dbRefProd.child("Products").child("Priority_Sector Loans").child("priority").set(document.getElementById("prod7").value);
    dbRefProd.child("Products").child("Education_Loans").child("priority").set(document.getElementById("prod2").value);
    dbRefProd.child("Products").child("FD").child("priority").set(document.getElementById("prod5").value);
    dbRefProd.child("Products").child("Retail_Loans").child("priority").set(document.getElementById("prod1").value);
    dbRefProd.child("Products").child("SME_Loans").child("priority").set(document.getElementById("prod6").value);

}


// (4) Points Conversion Rate

function pointsConversion(){
    dbRefProd.child("Rate").set(document.getElementById("encashment").value)
}

dbRefProd.child("Rate").on("value", function(snapshot){
    document.getElementById("encashment").value = snapshot.val();
});