
const users = ["testUser","JSmith","FPayne","RBrown","ENess","JBobson","Admin","DRivers","ABreckinridge","MHoward","MTatham","ANicholson","MChristophers","THumphrey","LBennett","GBoon","MWitherspoon","ARobson","DHaywood","RBone","CMercer","JWade"]
const passwords = ["password","password","password","goodpassword4","27111993","megafish","&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","69696969&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","natasha&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","passw0rd&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","november&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","snickers&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","MistyChristophers&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","blink182&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","wwjd&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","kawasaki&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","bobafett&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","hotstuff&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","whyisthenwordonthelistofmostcommonpasswords&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","abc123&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","letmein&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s","qwerty&L34JIgw4Y&3hLC6R65hf6rj@5e4eYDB50s"]
const sites = ["testSite","209543d5927ee698e494f4b73a91b6f6","f01e1d7825267d981acd54104a06c4b7","6348a92c10904b0646b5f0a9dc648ccb","31cce80563444942eb32488fe471f779","017ba547be845db91872060f17aa273e","4e2102e1c240050ef167fa4f3b4636d0","b83315a29e21f86b1c91795848bc71ef","5140c4dcaf396d5dff3f1111414da21d","57664d71ac9fc3077222d7fa3c1a031b","079742f0204e177e3fc2d47c1a5de2d0","831ab71818f2c2132ed65b8903500411","c2cc0f98cb280b0394fc69e84918b71b","a2041a412a9829ead4338c5ebd049be3","623ab3e8fff4f0b6bb1aefd53eb6d875","d422eaed4dfabb0086912e982a7c9849","411bb252881dcf755826ba71be30efd7","5907a16c789c06c8965591d940a6a1f5","86cccb8b15a315e52fbab9f5e964ebd8","4b768576fb075b88c65236213cd9842f","2266059b7a4925924eb03e5542274b61","9fec5162821d27018561f4caed0f3c85"]

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
	if (text.length>0){
		return true;
	}
	else{
		return false;
	}
	/*
	//Accepts any string of letters (regardless of capitalisation) of a length between 2 and 30 letters
	var regex = /^[a-zA-Z ]{2,30}$/;
	if (regex.test(text)){
		return true;
	}
	else{
		return false;
	}
	*/
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


