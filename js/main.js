
const teamSelectId = document.querySelector("#teamSelectId");
const amountStatChart = document.querySelector("#amountStatChart");
const roleAmountChart = document.querySelector("#roleAmountChart");
function showTeamAmountStats(){
    

    fetch("http://localhost:8090/iplstats/api/v1/stats/team-stats").then(res=>res.json()).then(data=>{
         amountStatChart.innerHTML = JSON.stringify(data);
    }).catch(error=>{
        console.log(error);
    })
}
function showRoleAmountStats(){
    fetch("http://localhost:8090/iplstats/api/v1/stats/role-stats").then(res=>res.json()).then(data=>{
        roleAmountChart.innerHTML = JSON.stringify(data);
   }).catch(error=>{
       console.log(error);
   })
}

function initTeamBasicDetails(){
   
        fetch("http://localhost:8090/iplstats/api/v1/team/basic-details").then(res=>res.json()).then(data=>{
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
    
}

initTeamBasicDetails();
showTeamAmountStats();
showRoleAmountStats();