function addImage() {
    alert("add new image!");
}

function activateItem(){
	console.log("hi");
	 jQuery(this).toggleClass('active');
	  
}
function validateForm(){
	console.log("hi");
	$('#name').validate();
	console.log(a);
    //var b=document.forms["Form"]["answer_b"].value;
    //var c=document.forms["Form"]["answer_c"].value;
    //var d=document.forms["Form"]["answer_d"].value;
    if (a==null)
      {
      alert("Please Fill All Required Field");
      return false;
      }
}
	
function submitForm() {
	alert("submit:http://tracked-server-dev.elasticbeanstalk.com/post_event");
	$("#name").validate();
	var formData = JSON.stringify(jQuery('#form-inline').serializeArray()); // store json string
	console.log(formData); 
}
