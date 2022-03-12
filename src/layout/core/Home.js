import React,{useEffect,useState} from 'react'
import Master from './Master'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div style={{width:"50px", height:"50px", backgroundColor:'red'}}>{text}</div>;
const Home = () => {
  document.title ="APKA DUKAN | HOME"
const[lat,setLat]=useState(0)
const[lng,setLng]=useState(0)
const[lodding,seLodding]=useState(true)

const getLag=()=>{

  navigator.geolocation.getCurrentPosition(function(position) {
    if (position.coords.latitude && position.coords.longitude) {
      seLodding(false)
      setLat( position.coords.latitude);
      setLng(position.coords.longitude);  
    }
  });
}
const handleDragEnd = (event) => {
  console.log(event.latLng.lng());
  console.log(event.latLng.lat());
}
const loadMap = (map, maps) => {
  //console.log(map,maps);

  let marker = new maps.Marker({
    position: { lat:23.5665, lng: 88.1004 },
    map,
    draggable: true,

  });
  marker.addListener('dragend', handleDragEnd);
};
  useEffect(() => {
    getLag()
   
  }, [])
  
  return (
    <Master>
      {lodding?(null):(
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyDGt77-gotuNZ4hFz6DkWBv4N0XFW3WJ6Q" }}
          defaultCenter={{
            lat:lat,
            lng:lng
          }}
          defaultZoom={11}
       
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
        >
         
        </GoogleMapReact>
      </div>
      )}
    </Master>
  )
}

export default Home
