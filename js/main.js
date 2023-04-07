
const teamSelectId = document.querySelector("#teamSelectId");
const amountStatChart = document.querySelector("#amountStatChart");
const roleAmountChart = document.querySelector("#roleAmountChart");
const playerData = document.querySelector("#playerData");
const baseUrl = "http://localhost:8090/iplstats/api/v1";

google.charts.load('current', {'packages':['corechart']});


function showTeamAmountStats(){
    fetch(`${baseUrl}/stats/team-stats`).then(res=>res.json()).then(data=>{
        drawColumnChart(data);
    }).catch(error=>{
        console.log(error);
    })
}
function showRoleAmountStats(){
    fetch(`${baseUrl}/stats/role-stats`).then(res=>res.json()).then(data=>{
        google.charts.setOnLoadCallback(drawPieChart(data));
   }).catch(error=>{
       console.log(error);
   })
}

function initTeamBasicDetails(){
   
        fetch(`${baseUrl}/team/basic-details`).then(res=>res.json()).then(data=>{
            let teamBasicDetails = data;
            showDropdownValues(teamBasicDetails);
        }).catch(error=>{
            console.log(error);
        })
}
function showDropdownValues(teamBasicDetails){
        let str = `<select class="form-select" id='selectedTeamId' onchange='showPlayerDetails()'>
        <option selected value=''>Select team</option>
        `;
        for(let i=0;i<teamBasicDetails.length;i++){
                team = teamBasicDetails[i];
                str += `<option value=${team.id}>${team.label} - <i>${team.name}</i></option>`
        }
        str += '</select>';
        
        teamSelectId.innerHTML = str;
}

function showPlayerDetails(){
    let teamId= document.querySelector('#selectedTeamId').value;
    if(teamId !== ""){
        fetch(`${baseUrl}/team/${teamId}/players`).then(res=>res.json()).then(data=>{
            viewPlayerDetails(data);
        }).catch(error=>{
            console.log(error);
        })
    }
    
}

function viewPlayerDetails(players){
        let str = "Please select team name to see player information";
        console.log(players);
        if(players.length > 0){
                str = '<table class="table table-striped">';
                str += '<thead><tr><th>Name</th><th>Role</th><th>Country</th><th>Amount</th></tr></thead>';
                str += '<tbody>';
                players.forEach(p => {
                   str += `<tr>
                                <td>${p.name}</td>
                                <td>${p.role}</td>
                                <td>${p.country}</td>
                                <td>${p.amount}</td>
                           </tr>
                         ` ;
                });
                
                str += '</tbody></table>';            
        }
        playerData.innerHTML = str;

}

initTeamBasicDetails();
showTeamAmountStats();
showRoleAmountStats();


function drawPieChart(statData) {
    let arr = [['Role', 'Amount']];
    statData.forEach(ele=>{
        arr.push([ele.role,ele.totalAmount])
    })
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
      title: 'Role Amount Details'
    };
    var chart = new google.visualization.PieChart(document.getElementById('roleAmountChart'));
    chart.draw(data, options);
}

function drawColumnChart(statData) {
    let arr = [['Team', 'Amount']];
    statData.forEach(ele=>{
        arr.push([ele.label,ele.totalAmount])
    })
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
      title: 'Team mount Details'
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('amountStatChart'));
    chart.draw(data, options);
}