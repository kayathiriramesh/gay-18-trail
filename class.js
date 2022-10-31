var container=document.createElement("div");
container.setAttribute("class","container");
var row=document.createElement("div");
row.setAttribute("class","row");
row.classList.add("row","m-3");
container.append(row);

var res=fetch("https://restcountries.com/v2/all");
res.then((data)=>data.json()).then((data1)=>foo(data1));


async function restdata(){
    let res=await fetch("https://restcountries.com/v2/all");
    let res1= await res.json();
    console.log(res1);
    try {
        for(var i=0;i<res1.length;i++)
        {
        var name=res1[i].name;
        var latlong=res1[i].latlng;
        if(latlong.length===undefined)
        {
            throw new Error("invalid coordinates");
        }
        opendata(name,...latlong);
        }
    } catch (error) {
        console.log("invalid"+error.message);
    }
    }
    async function opendata(name,lat,lon){
    try { 
    let res2=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b55f75dc8ebc4a44f808493820896b4`);
    let res3= await res2.json();
    console.log(`Country name:${name} , Temp:${res3.main.temp}`);
    } catch (error) {
        console.log(error.message);
    }
    }

function foo(data1){
for(var i=0;i<data1.length;i++){
   row.innerHTML+=`<div class="col-lg-4">
   <div class="card text-white bg-info mb-3" style="max-width: 18rem;"></div>
   <div class="card-header" style="background-color:white; font-family: 'Courier New', Courier, monospace;text-align:center;">Countryname:${data1[i].name}</div>
   <img src="${data1[i].flag}" class="card-img-top" alt="...">
   <div class="card-body text-success" style="text-align:center;">
        <h5 class="card-title">Capital:${data1[i].capital}</h5>
        <h5 class="card-title">Region:${data1[i].region}</h5>
        <h5 class="card-title">Countrycode:${data1[i].cioc}</h5>
        <h5 class="card-title">Latitude:${data1[i].latlng[0]}</h5>
        <h5 class="card-title">Longitude:${data1[i].latlng[1]}</h5>
        <a href="#" class="btn btn-primary" onclick="restdata()">Click For Weather</a>    
   </div>
 </div>`;
document.body.append(container); 
}
}