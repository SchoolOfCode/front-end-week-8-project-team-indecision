import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import L from "leaflet";
import Form from "../Form";
import {
  TwitterTimelineEmbed,
  TwitterHashtagButton
} from "react-twitter-embed";
import bhamPoly from "../../const_wgs84";

// Set global vars
let allowTreeAdd = false;
const bhamPosition = [52.4862, -1.8904];

const dummyData = [
  {
    lat: 52.862,
    lon: -1.904,
    species: "larch",
    status: "planted",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.62,
    lon: -1.04,
    species: "elm",
    status: "requested",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.2,
    lon: -1.4,
    species: "ash",
    status: "planted",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.4862,
    lon: -1.8904,
    species: "birch",
    status: "requested",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.862,
    lon: -1.8904,
    species: "larch",
    status: "planted",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.62,
    lon: -1.8904,
    species: "elm",
    status: "requested",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.2,
    lon: -1.8904,
    species: "ash",
    status: "requested",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.4862,
    lon: -1.8904,
    species: "birch",
    status: "planted",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.4862,
    lon: -1.904,
    species: "larch",
    status: "planted",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.4862,
    lon: -1.04,
    species: "elm",
    status: "requested",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  },
  {
    lat: 52.4862,
    lon: -1.4,
    species: "ash",
    status: "planted",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
  }
];

const redTreeMarker = new L.icon({
  iconUrl: require("../../img/icon_red.png"),
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(15, 15)
});

const greenTreeMarker = new L.icon({
  iconUrl: require("../../img/icon_green.png"),
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(15, 15)
});

function toggleAllowTreeAdd() {
  allowTreeAdd = !allowTreeAdd;
}

function App() {
  const [trees, setTrees] = useState(dummyData);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  useEffect(() => {
    fetch("http://192.168.0.71:5000/trees", requestOptions)
      .then(res => res.json())
      .then(x => {
        setTrees(x);
        console.log(x.image);
      });
  }, []);
  console.log(trees);

  function handleClick(e) {
    const { lat, lng } = e.latlng;
    const newTree = {
      latitude: lat,
      longitude: lng,
      species: "larch",
      status: "planted",
      comment: "This was just added!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg"
    };
    allowTreeAdd && setTrees([...trees, newTree]);
  }

  function getMyGeolocation() {
    let myLat, myLon;
    function geoSuccess(pos) {
      myLat = pos.coords.latitude;
      myLon = pos.coords.longitude;
      allowTreeAdd = !allowTreeAdd;
      handleClick({ latlng: { lat: myLat, lng: myLon } });
      allowTreeAdd = !allowTreeAdd;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }
  }

  const map = (
    <Map
      center={bhamPosition}
      zoom={9}
      maxZoom={16}
      minZoom={8}
      onclick={handleClick}
    >
      <ReactLeafletSearch
        position="topleft"
        provider="OpenStreetMap"
        providerOptions={{ region: "gb" }}
        inputPlaceholder="Search by postcode or area name"
        closeResultsOnClick={true}
        showPopup={true}
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={bhamPoly}
        style={{ color: "darkgreen", fillColor: "lightgreen", weight: 1 }}
      />
      {trees.map(x => {
        if (x.longitude) {
          return (
            <Marker
              icon={x.status === "Planted" ? greenTreeMarker : redTreeMarker}
              position={[x.latitude, x.longitude]}
              key={x.status + x.latitude + x.longitude + x.species + x.treeid}
            >
              <Popup style={{ color: "red" }}>
                <p style={{ textAlign: "center", padding: "5px" }}>
                  <strong>{x.species}</strong>
                  <br />
                  {x.comment} <br />
                </p>
                {x.image.type === "Buffer" ? (
                  <img
                    style={{ margin: "0 auto", display: "block" }}
                    width="100px"
                    src={require("../../img/tree_silhouette.png")}
                    alt={x.species}
                  />
                ) : (
                  <img
                    style={{ margin: "0 auto", display: "block" }}
                    width="100px"
                    src={x.image}
                    alt={x.species}
                  />
                )}
              </Popup>
            </Marker>
          );
        }
      })}
    </Map>
  );

  return (
    <div className={css.container}>
      <header>
        <img
          className={css.WMCALogo}
          src={require("../../img/West_Midlands_Combined_Authority_logo.png")}
          alt="West Midlands Combined Authority Logo"
        />
        <h1>West Midlands Virtual Forest</h1>
      </header>

      <div className={css.mapStyle}>
        {map}
        <button className={css.addTreeButton} onClick={toggleAllowTreeAdd}>
          Add tree
        </button>
        <button className={css.addTreeHereButton} onClick={getMyGeolocation}>
          Add a tree at my current location
        </button>
      </div>
      <div className={css.treeEntryForm}>
        <Form />
      </div>
      <div className={css.twitterFeed}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="WestMids_CA"
          options={{ width: "600px", height: "900px" }}
        />
      </div>
      <div className={css.twitterHashTagButton}>
        <TwitterHashtagButton tag={"NeedsATree"} />
      </div>
      <footer>
        <a href="https://www.wmca.org.uk/careers?_ga=2.233332958.1505638702.1583852010-1790124967.1583750647">
          Jobs
        </a>
        <a href="https://www.wmca.org.uk/policies?_ga=2.261120205.1505638702.1583852010-1790124967.1583750647">
          Policies
        </a>
        <a href="https://www.wmca.org.uk/documents?_ga=2.261120205.1505638702.1583852010-1790124967.1583750647">
          Documents
        </a>
        <a href="https://governance.wmca.org.uk/?_ga=2.261120205.1505638702.1583852010-1790124967.1583750647">
          Committee meetings
        </a>
        <a href="https://www.wmca.org.uk/contact-us?_ga=2.261120205.1505638702.1583852010-1790124967.1583750647">
          Contact us
        </a>
        <a href="https://www.wmca.org.uk/freedom-of-information?_ga=2.266470478.1505638702.1583852010-1790124967.1583750647">
          Freedom of information
        </a>
        <a href="https://www.wmca.org.uk/procurement?_ga=2.266470478.1505638702.1583852010-1790124967.1583750647">
          Procurement
        </a>
        <a href="https://www.wmca.org.uk/media-assets?_ga=2.266470478.1505638702.1583852010-1790124967.1583750647">
          Media assets
        </a>
        <p>© 2020 West Midlands Combined Authority and School of Code</p>
      </footer>
    </div>
  );
}

export default App;
