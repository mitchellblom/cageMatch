$(document).ready(() => {

	let leftUserJSON = "";
	let rightUserJSON = "";

// PRIMARY BUTTON EVENTS

	$("#load-both-users").click(() => {
		resetAll();
		loadBothUsers();
	});

	$("#reset-button").click(() => {
		resetAll();
	});

	$("#fight-button").click(() => {
		if (leftUserJSON == "" || rightUserJSON == ""){
			alert("Please make sure you've loaded both users!");
		} else {
			beginTheFight();
		}
	}); 

	const resetAll = () => {
		$("#user-container-right").html("").animate({opacity: 1}, 0);
		$("#user-container-left").html("").animate({opacity: 1}, 0);
		$("#winner-badges").html("");
		leftUserJSON = "";
		rightUserJSON = "";
	};

// FIGHT SEQUENCE

	const beginTheFight = () => {
		if (leftUserJSON.points.total > rightUserJSON.points.total) {
			alert(leftUserJSON.name + " obliterated " + rightUserJSON.name + " with a huge right hook!");
			$("#user-container-left").animate({left: '245px'}, 1000);
			$("#user-container-right").animate({opacity: 0}, 0);
			leftUserJSON.badges.forEach((each) => {
				$("#winner-badges").append(`<img class="winner-badge" src="${each.icon_url}" alt="winner-single-badge">`)
				.animate({
					width: ["toggle"],
					height: ["toggle"],
					}, 2000, "linear", function() {
					$(this).after();
				});
			});
		} else if (leftUserJSON.points.total < rightUserJSON.points.total) {
			alert(rightUserJSON.name + " knocked out " + leftUserJSON.name + " with a wicked side kick!");
			$("#user-container-right").animate({right: '315px'}, 1000);
			$("#user-container-left").animate({opacity: 0}, 0);
			rightUserJSON.badges.forEach((each) => {
				$("#winner-badges").append(`<img class="winner-badge" src="${each.icon_url}" alt="winner-single-badge">`)
				.animate({
				    width: ["toggle"],
				    height: ["toggle"],
				  	}, 2000, "linear", function() {
				    $(this).after();
				});
			});
		} else if (leftUserJSON.points.total == rightUserJSON.points.total) {
			alert(leftUserJSON.name + " and " + rightUserJSON.name + " are locked in a bitter struggle of self-identity!");
		} else {
			alert("Have you defined both users?");
		}
	};

// LEFT USER FUNCTIONS

	$("#left-user-button").click(() => {
		onLeftSubmit();
	});

	const onLeftSubmit = () => {
		loadLeftUserJSON().then((results) => {
			leftUserJSON = results;
			writeLeftUserToDom(leftUserJSON);
		});
	};

	const loadLeftUserJSON = () => {
		let leftUserInput = $("#left-user").val();
		let leftUserURl = `https://teamtreehouse.com/${leftUserInput}.json`;
	    return new Promise((resolve, reject) => {
	        $.ajax(leftUserURl).done((data1) => {
	            resolve(data1);
	        }).fail((error1) => {
	            reject(error1);
	            alert("Looks like User A isn't recognized.");
	            console.log("error1", error1);
	        });
	    });
	};

	const writeLeftUserToDom = (leftUserJSON) => {
	    let userString = "";
	    userString += 	`<div class="user-for-stying">
	    				<h3>Fighter One:</h3>
	   					<h2 id="left-user-on-dom">${leftUserJSON.name}</h2>
	   					<h3>Total Points:</h3>
	   					<h2 id="leftUserPoints">${leftUserJSON.points.total}</h2>
	   					<img class="user-image" src="${leftUserJSON.gravatar_url}" alt="left user image">
	   					</div>
	   					`;
	    $("#user-container-left").html(userString).fadeIn().animate({left: '10px'}, 1000);
	};

// RIGHT USER FUNCTIONS

	$("#right-user-button").click(() => {
		onRightSubmit();
	});

	const onRightSubmit = () => {
		loadRightUserJSON().then((results) => {
			rightUserJSON = results;
			writeRightUserToDom(rightUserJSON);
		});
	};

	const loadRightUserJSON = () => {
		let rightUserInput = $("#right-user").val();
		let rightUserURl = `https://teamtreehouse.com/${rightUserInput}.json`;
	    return new Promise((resolve, reject) => {
	        $.ajax(rightUserURl).done((data2) => {
	            resolve(data2);
	        }).fail((error2) => {
	            reject(error2);
	            alert("Looks like User B isn't recognized.");
	            console.log("error2", error2);
	        });
	    });
	};

	const writeRightUserToDom = (rightUserJSON) => {
	    let userString = "";
	    userString += 	`<div class="user-for-stying">
	    				<h3>Fighter Two:</h3>
	    				<h2 id="right-user-on-dom">${rightUserJSON.name}</h2>
	    				<h3>Total Points:</h3>
	    				<h2 id="rightUserPoints">${rightUserJSON.points.total}</h2>
	    				<img class="user-image" src="${rightUserJSON.gravatar_url}" alt="right user image">
	    				</div>`;
	    $("#user-container-right").html(userString).fadeIn().animate({right: '10px'}, 1000);
	};

	const loadBothUsers = () => {
		Promise.all([loadLeftUserJSON(), loadRightUserJSON()])
		.then(function(results){
			leftUserJSON = results[0];
			rightUserJSON = results[1];
			writeLeftUserToDom(results[0]);
			writeRightUserToDom(results[1]);
		});
	};

});