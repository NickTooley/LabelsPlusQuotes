<!-- OVERVIEW -->
<div class="panel panel-headline">
    <div class="panel-heading">
        <h3 class="panel-title">Users Overview</h3>
    </div>
    <div class="panel-body">
    <div class="panel">
            <div class="panel-heading">
                <input type="text" id="myInput" class="form-control" onkeyup="myFunction()" placeholder="Search for names..">
            </div>
            <div class="panel-body no-padding">
                <style>
                    .text{
                        width: 450px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                </style>
                <table class="table table-striped2" id="userTable">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            foreach($allUsers as $row){ $currID = $row['id']?>
                                <tr class="clicker">
                                    <td class=""><a href="#"><?php echo($currID) ?></a></td>
                                    <td><?php echo($row['username']) ?></td>
                                    <td><?php echo($row['email']) ?></td>
                                    <td><span class="label label-success">COMPLETED</span></td>
                                </tr>
                                <tr class="tableedit" style="display:none">
                                <?php $self = htmlspecialchars($_SERVER['PHP_SELF']);
                                    // echo ("<form action='$self' method='POST'>");
                                ?>
                                    <form id="form-<?php echo($currID)?>">
                                    <td class="text" style="padding-left:25px;"  colspan="4">
                                    <?php 
                                        
                                        
                                        $userCodesString = "SELECT *
                                        FROM users_links
                                        WHERE user_id = $currID";

                                        $userCode = $pdo->prepare($userCodesString);
                                        $userCode->execute();

                                    ?>
                                        <textarea name="content" rows="4" cols="90"><?php if($userCode->rowCount() != 0){echo($userCode->fetch(0)['embed_code']);} ?></textarea>
                                        <br />
                                        <input type="hidden" name="custId" value="<?php echo($currID); ?>">
                                        <!-- <input type='submit' name='submitchange' value='Confirm' class="btn btn-primary"> -->
                                        <input type="button" value="Save" onclick="sendForm(<?php echo($currID); ?>)" class="btn btn-primary" />
                                    </td>
                                    </form>
                                </tr>
                        <?php
                            }
                        ?>
                        
                    </tbody>
                </table>
            </div>
            <div class="panel-footer">
                <div class="row">
                </div>
            </div>
        </div>

        <script>
             function sendForm(x){
                var formID = x.toString();
                console.log(jQuery("#form-"+formID).serialize());
                
                $.ajax({
                type: "POST",
                url: "editcodes.php",
                data: jQuery("#form-"+formID).serialize(),
                cache: false,
                success:  function(data){
                    alert("Successfully Updated");
                }
            });

            }
        </script>
						