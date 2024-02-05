 
 const BASE_URL =
 "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
 
const dropdown =document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector("#message");


 
for(let val of dropdown){                                         // for of loop is used for strings and arrays
    for(let currency in countryList){                              // for in loop is used for objects
        // create and add in elements go hand in hand
        let newopt=document.createElement("option"); 
        newopt.innerText=currency; 
        newopt.value=currency;
        if (val.name==="from" && currency==="USD"){
            newopt.selected="selected";
        }else if 
            (val.name==="to" && currency==="INR"){
                newopt.selected="selected";
        }
        // inserting elements in html or css using js
       val.prepend(newopt);                                         // prepend is used to add element
 
    }
    val.addEventListener("change",(e)=>{
 updateflag(e.target);
    });
}
 
const updateflag= (element)=>{
let currency=element.value;
let countrycode= countryList[currency];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;   //image will be changed according to the country 
let img= element.parentElement.querySelector("img" );
img.src=newsrc;

};

btn.addEventListener("click",async (evt)=>{
evt.preventDefault();                                        // prevent defualt means the page will now not br refreshed upon clicking.
let amount = document.querySelector("form input");
let amtvalue=amount.value;
  console.log(amtvalue);      
if(amtvalue==="" || amtvalue <0   ){
amtvalue=1;
amount.value="1";
}    
console.log(fromcurr.value,tocurr.value); 
const URL= `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json `; 
 let response = await fetch(URL);
 
  let data = await response.json(); 
  let rate = data[tocurr.value.toLowerCase() ]; 
  console.log(rate);             
  let finalrate=amtvalue * rate;
msg.innerText=`${amtvalue}${fromcurr.value}= ${finalrate}${tocurr.value}`
});  

// to use await we need to make the function async function 
// api is case sensitive and only accepts lowercase values