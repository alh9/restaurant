const searchBtn = document.getElementById('search-btn');
var searchBox = document.getElementById('search-box') 
var divBoxConatainer = document.getElementById('boxContainer')//ke bezarim tush
var thePrice = document.getElementById('price')
var theStar = document.getElementById('star')
var theDistance = document.getElementById('distance')
var random = true;
const fetch_data = async () => {
  try {
      const token = 'lUN2j_5uYAd-fMFjbeKkc7mj5_twdTrjOIxWE0LRz4Gr-XTGHVH1FDCyV6yGYIhtoHwffOB1dOE63MgwhxoycdBeFETvtC1Kp10KEd0y-colbXbTB3gtJhPjVvDxYHYx'
      const { data } = await axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants&location=london&limit=50`, {
        headers: {
           'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token}`
        }
    })
      console.log(data)
      makeDiv(data,49,1)
      function getData(event){
        var dataSearch = {businesses:[]};
        event.preventDefault()
        console.log(data)
        for(j=0;j<50;j++){
          if(data.businesses[j].name.includes(searchBox.value)){
            console.log(data.businesses[j].name)
            dataSearch.businesses.push({name:data.businesses[j].name,image_url:data.businesses[j].image_url,distance:data.businesses[j].distance})    
          }
        }
        divBoxConatainer.innerHTML='';
        makeDiv (dataSearch,Number(dataSearch.businesses.length),0,true )
      }
      searchBtn.addEventListener('click' , getData);        
    
    } catch ({ message }) {
        throw new Error(message)
    }

}
fetch_data()

function makeDiv (data,x,y,random){
  var had = 10;
  var dataToShow = {businesses:[]}
  if(data.businesses.length<10){
     had = data.businesses.length
  }
  if(random){
    for (i=0;i<had;i++){
      var number = Math.floor((Math.random() * x) + y);
      var divBox = document.createElement('div');
      var divDetails = document.createElement('div');
      var resImg = document.createElement('img');
      var resName = document.createElement('p');
      divBox.className = 'box';
      divDetails.className = 'details';
      resImg.alt = 'res-pic';
      resImg.src =data.businesses[number].image_url
      resName.innerHTML = data.businesses[number].name;
      divBoxConatainer.appendChild(divBox)
      divBox.appendChild(resImg)
      divBox.appendChild(divDetails)
      divDetails.appendChild(resName)
      dataToShow.businesses.push({name:data.businesses[number].name , image_url:data.businesses[number].image_url,distance:data.businesses[number].distance})
    }
  }
  else{
    for (i=0;i<had;i++){
      var divBox = document.createElement('div');
      var divDetails = document.createElement('div');
      var resImg = document.createElement('img');
      var resName = document.createElement('p');
      divBox.className = 'box';
      divDetails.className = 'details';
      resImg.alt = 'res-pic';
      resImg.src =data.businesses[i].image_url
      resName.innerHTML = data.businesses[i].name;
      divBoxConatainer.appendChild(divBox)
      divBox.appendChild(resImg)
      divBox.appendChild(divDetails)
      divDetails.appendChild(resName)
      dataToShow.businesses.push({name:data.businesses[i].name , image_url:data.businesses[i].image_url,distance:data.businesses[i].distance,
      rating:data.businesses[i].rating  })
  }}
  
evenHandlerer(dataToShow)

}
function evenHandlerer(data){
  theDistance.addEventListener('click' , sortByDistance)
  theStar.addEventListener('click' , sortByStar)
  thePrice.addEventListener('click' , sortByPrice)
  function sortByDistance(){
    event.preventDefault()
    data.businesses.sort(function(a, b){return  b.distance-a.distance})
    divBoxConatainer.innerHTML='';
    makeDiv (data,Number(data.businesses.length),0,false)    
    theStar.removeEventListener('click' , sortByStar)
    thePrice.removeEventListener('click' , sortByPrice)
    theDistance.removeEventListener('click' , sortByDistance)
  }
  function sortByStar(){
    event.preventDefault()
    data.businesses.sort(function(a, b){return  b.rating - a.rating})
    divBoxConatainer.innerHTML='';
    console.log(22)
    makeDiv (data,Number(data.businesses.length),0,false)    
    theStar.removeEventListener('click' , sortByStar)
    thePrice.removeEventListener('click' , sortByPrice)
    theDistance.removeEventListener('click' , sortByDistance)
  }
    function sortByPrice(){//price should be number 
    event.preventDefault()
    data.businesses.sort(function(a, b){return  b.price - a.price})
    divBoxConatainer.innerHTML='';
    console.log(33)
    makeDiv (data,Number(data.businesses.length),0,false)
    theStar.removeEventListener('click' , sortByStar)
    thePrice.removeEventListener('click' , sortByPrice)
    theDistance.removeEventListener('click' , sortByDistance)
  }
}

// command: open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials





