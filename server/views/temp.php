<?php 
ini_set('session.cookie_domain', '');
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<?php


require __DIR__ . '/vendor/autoload.php';
include 'connect.inc.php';
if(isset($_GET['logout']))
{
	$auth->logOut();
}

include 'accesscontrol.php';


?>

<head>
	<title>Acquire Online Dashboard</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- VENDOR CSS -->
	<link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="assets/vendor/linearicons/style.css">
	<link rel="stylesheet" href="assets/vendor/chartist/css/chartist-custom.css">
	<!-- MAIN CSS -->
	<link rel="stylesheet" href="assets/css/main.css">
	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
	<!-- ICONS -->
	<link rel="icon" type="image/png" sizes="96x96" href="https://acquirenz.com/favicon-96.png">
</head>

<body>
	<!-- WRAPPER -->
	<div id="wrapper">
		<!-- NAVBAR -->
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="brand">
				<a href="index.php"><img src="images/logo-dark.png" height="40" alt="Acquire Logo" class="img-responsive logo"></a>
			</div>
			<div class="container-fluid">
				<div class="navbar-btn">
					<button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
				</div>
				<div id="navbar-menu">
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-user"></i><span><?php echo( $auth->getUsername());?></span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
							<ul class="dropdown-menu">
								<li><a href="index.php?logout=true"><i class="lnr lnr-exit"></i> <span>Logout</span></a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<!-- END NAVBAR -->
		<!-- LEFT SIDEBAR -->
		<div id="sidebar-nav" class="sidebar">
			<div class="sidebar-scroll">
				<nav>
					<ul class="nav">
						<?php 
							if($auth->hasRole(\Delight\Auth\Role::ADMIN)){ ?>
								<li><a href="index.php" class="active"><i class="lnr lnr-home"></i> <span>Edit Users</span></a></li>
								<li><a href="register.php" class=""><i class="lnr lnr-code"></i> <span>Add User</span></a></li> 
							<?php
							}else{ ?>
								<li><a href="index.php" class="active"><i class="lnr lnr-code"></i> <span>Datorama Links</span></a></li>
							<?php
							}
						?>
					</ul>
				</nav>
			</div>
		</div>
		<!-- END LEFT SIDEBAR -->
		<!-- MAIN -->
		<div class="main">
				<!-- MAIN CONTENT -->
					<div class="main-content">
						<div class="container-fluid">
							<?php 
							if($auth->hasRole(\Delight\Auth\Role::ADMIN)){
								$allUsersString = "SELECT id, email, username
													FROM users
													WHERE roles_mask = 0
													ORDER BY username";

								$allUsers = $pdo->prepare($allUsersString);
								$allUsers->execute();
								include 'admindash.html.php';
							}else{

								$currID = $auth->getUserId();
								$userString = "SELECT *
								FROM users_links
								WHERE user_id = $currID";

								$userLinks = $pdo->prepare($userString);
								$userLinks->execute();
								include 'userdash.html.php';
							}
							?>
						</div>
					</div>
					<!-- END OVERVIEW --> 
			<!-- END MAIN CONTENT -->
		</div>
		<!-- END MAIN -->
		<div class="clearfix"></div>
		<footer>
			<div class="container-fluid">
			</div>
		</footer>
	</div>
	<!-- END WRAPPER -->
	<!-- Javascript -->
	<script src="assets/vendor/jquery/jquery.min.js"></script>
	<script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>
	<script src="assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js"></script>
	<script src="assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js"></script>
	<script src="assets/vendor/chartist/js/chartist.min.js"></script>
	<script src="assets/scripts/klorofil-common.js"></script>
	<script>
		function myFunction() {
		// Declare variables 
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		table = document.getElementById("userTable");
		tr = table.getElementsByTagName("tr");

		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[1];
			if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {				
				if(tr[i].className == "clicker"){
					tr[i].style.display = "";
				}
			} else {
				if(tr[i].className == "clicker"){
					tr[i].style.display = "none";
				}
			}
			} 
		}
		}
	</script>

	<script>
		$('.clicker').click(function(){
			$(this).nextUntil('.clicker').slideToggle();
		});
	</script>
</body>

</html>
