
const users = ["testUser"]
const passwords = ["password"]
const sites = ["testSite"]

function postUserDetails(){
	var data = saveForm();
	if (typeof(data)=="string"){
		sendInputStatus(data);
	}
	else{
		if (users.includes(data["username"])){
			let index = users.indexOf(data["username"])
			if (data["pass"]==passwords[index]){
				sendInputStatus(true)
				window.location.href = "/users/"+sites[index];
			}
			else{
				sendInputStatus("Error: Incorrect password")
			}
		}
		else{
			sendInputStatus("Error: User not found")
		}
	}
	
};
//This is a function called by postUserDetails(), it saves the data the user has put into the form
function saveForm(){
	//Creates an object to assign the data to
	var formData = {};
		
	//Gets the person's first name from the page, validates it and if it passes, gives it proper capitalisation and adds it to the object. Otherwise, it returns an error code
	var username = $('#username').val();
	if (validateName(username)==false){
		return "Error: Invalid Username"
	}
	formData.username = username;
	
	//Same for the last name
	var pass = $('#pass').val();
	if (validateName(pass)==false){
		return "Error: Invalid Password"
	}
	formData.pass = pass;
	
    return formData
};
function validateName(text){
	//Accepts any string of letters (regardless of capitalisation) of a length between 2 and 30 letters
	var regex = /^[a-zA-Z ]{2,30}$/;
	if (regex.test(text)){
		return true;
	}
	else{
		return false;
	}
}
//This outputs the result of the user entering data to the screen (whether it has gone through successfully or something was entered wrong)
function sendInputStatus(outputText){
	var successText = document.getElementById("successText");
	successText.style.display="inline";
	if (outputText==true){
		successText.innerHTML = "Success!";
		successText.style.color = "green";
	}
	else{
		successText.innerHTML = outputText;
		successText.style.color = "red";
	}
}
function resetData(){
	var successText = document.getElementById("successText");
	successText.style.display="none";
}


