import pokedexjson from "./pokedex.json"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


//Map
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotatedmarker";

//MapSidebar
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FlareIcon from '@mui/icons-material/Flare';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import ChatRoom from "./ChatRoom"

import "./css/Pokedex.css"

const locations = [
    {
        type: 1, name: "Alta Kirke", coords: { lat: 70.22, lng: 22.01 },
        lat: 69.96511261967144,
        lng: 23.2667738199234,
        latLng: [70.22, 22.01]
    },
    {
        type: 0, name: "22 Juli Minnestein", coords: { lat: 70.22, lng: 22.01 },
        lat: 69.96599291120057,
        lng: 23.27048599720001,
        latLng: [70.22, 22.05]
    },
    {
        type: 0, name: "Steinkarn", coords: { lat: 70.22, lng: 22.01 },
        lat
            :
            69.96667102280772,
        lng
            :
            23.2735008001327,
        latLng: [70.23, 22.01]
    },
    {
        type: 0, name: "Buss for tog", coords: { lat: 70.22, lng: 22.01 },
        lat
            :
            69.96438299712129,
        lng
            :
            23.27325940132141,
        latLng: [70.21, 22.21]
    },
]



function findPokemon(id) {
    if (!id)
        return
    if (!pokedexjson.length > 0) {
        console.log("No pokemans")
    }
    var pokemon = pokedexjson.find(
        (pkmn) => pkmn.id == id
    );
    return pokemon;
}

const PokemonInfo = (props) => {
    console.log(props.pokemon);
    if (!Object.keys(props.pokemon).length > 0)
        return (<>Gotta Catch Em All</>)
    else
        return (
            <>
                <h1><span style={{ fontWeight: "100" }}>#{props.pokemon?.id}</span> {props.pokemon?.name?.english}</h1>
            </>
        )
}
const PokemonSelect = (props) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(null);
    return (
        <>
            <Autocomplete
                id="pokedex-search-bar"
                value={value}
                // options={pokedexjson.map((option) => `#${option.id} ${option.name.english}`)}
                options={pokedexjson.map((option) => option)}
                getOptionLabel={(option) => `#${option.id} ${option.name.english}`}
                renderInput={(params) => <TextField {...params} label="Select Pokèmon..." />}
                onChange={(event, selectedPokemon) => {
                    setValue(selectedPokemon);
                    navigate(`/pokedex/${selectedPokemon.id}`);

                    props.handlePokemonChange(selectedPokemon);
                }}
            />
        </>
    )
}

const AddMarker = (props) => {
    const map = useMapEvents({
        click: handleAddMarker
    })


    function handleClickOnMap(e) {

    }
    function handleAddMarkerButton(e) {

    }
    function handleAddMarker(e) {
        var MarkerType = {
            Pokestop: 0,
            Gym: 1
        }
        if (props.isAddingMarker) {
            var newMarker = new L.circleMarker(e.latlng, { draggable: 'true' });
            newMarker.on("click", () => {

            })
            newMarker.bindPopup(
                "hello world"
            );
            newMarker.addTo(map);
            props.handleMarkerAdded();

            console.log(newMarker);
        }
    }

}
const MapSidebar = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mapWidth, setMapWidth] = useState(361);



    function handleClose() {
        console.log("close")
        setIsSidebarOpen(false)
    }
    function handleOpen() {
        console.log("open")
        setIsSidebarOpen(true)
    }
    return (
        <>
            <Drawer
                anchor='left'
                open={isSidebarOpen}
                variant="persistent"
                sx={{
                    '& .MuiDrawer-root': {
                        position: 'absolute'
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute'
                    },
                }}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClose}>
                            <ListItemText primary="Sites" style={mapWidth > 360 ? { width: "140px" } : { width: "100%" }} />
                            <ListItemIcon>
                                <CloseIcon></CloseIcon>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    {locations.map((item, index) => {
                        return (
                            <ListItem disablePadding key={index}>
                                <ListItemButton onClick={() => { props.panTo(item.lat, item.lng) }}>
                                    <ListItemIcon>
                                        <CatchingPokemonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>

            <MenuIcon style={{ position: "absolute", top: "12px", left: "12px", zIndex: "999", color: "black" }}
                onClick={() => { setIsSidebarOpen(true) }}
            >Open</MenuIcon>

        </>
    )
}


const UserMarker = (props) => {
    const map = useMapEvents();
    var userMarker = new L.marker([props.userPosition.coords.lat, props.userPosition.coords.lng], { draggable: 'true' });
    userMarker.addTo(map);
}

// const LocationMarkers = (props) => {
//     props.locations.map((item, index) => {
//         console.log(item);
//         return (
//             <Marker key={index} position={[item.lat, item.lng]}>
//                 <Popup>Hello World!</Popup>
//             </Marker>
//         );
//     })
// }

// const LocationMarkersFilteredByGeoLocation = (props) => {

// }


const Pokedex = () => {
    const params = useParams();
    const [pokemonId, setPokemonId] = useState(null);
    const [pokemon, setPokemon] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    //Tabs
    const [tabIndex, setTabIndex] = useState("1");
    function handleTabChange(event, newValue) {
        setTabIndex(newValue);
    }


    //pokemap
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const userMarkerRef = useRef(null);
    const [position, setPosition] = useState([69.96636432125193, 23.272927898342715]);
    const [zoomLevel, setZoomLevel] = useState(20);
    const [userPosition, setUserPosition] = useState({});
    const [markers, setMarkers] = useState([]);
    const [personalMarkers, setPersonalMarkers] = useState([]);
    const [isAddingMarker, setIsAddingMarker] = useState(false);
    const [isMapSidebarHidden, setIsMapSidebarHidden] = useState(true);
    const [mapWidth, setMapWidth] = useState(null)


    function handleUserPositionSuccess(geoLocationPositionCoordinates) {
        setUserPosition(geoLocationPositionCoordinates);
        mapRef.current.panTo(new L.latLng(geoLocationPositionCoordinates.coords.latitude, geoLocationPositionCoordinates.coords.longitude));
    }
    function handleUserPositionError(error) {
        console.log("errorhandling n shit");
    }
    function handleMarkerAdded() {
        setIsAddingMarker(false);
    }

    // index / landingpage
    function handlePokemonChange(pokemon) {
        setPokemon(pokemon);
    }
    function handlePanTo(lat, lng) {
        mapRef.current?.panTo(new L.latLng(lat, lng));
    }



    useEffect(() => {
        //initial load
        if (!isLoaded) {
            if (params.id) {
                setPokemon(findPokemon(params.id));
            }

            navigator.geolocation.getCurrentPosition(handleUserPositionSuccess, handleUserPositionError);
            setIsLoaded(true);
        }
    }, [isLoaded])

    return (
        <>
            <div className="pokdexContainer">
                <Box sx={{ width: '100%' }}>
                    <TabContext value={tabIndex}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Map" value="1" />
                                <Tab label="Messages" value="2" />
                                <Tab label="Announcements" value="3" />
                                <Tab style={{ margin: "0 0 0 auto" }} label="Profile" value="4" />
                            </TabList>
                        </Box>
                        {/* Create own component for each tab */}
                        <TabPanel value="1" style={{ padding: 0 }}>
                            <div className="pokemap">
                                <MapContainer
                                    ref={mapRef}
                                    center={position}
                                    zoom={zoomLevel}
                                    style={{ height: "100%", position: "relative" }}
                                    zoomControl={false}
                                    attributionControl={false}
                                >
                                    {
                                        locations.map((item, index) => {
                                            return (
                                                <Marker key={index} position={[item.lat, item.lng]}>
                                                    <Popup>Hello World</Popup>
                                                </Marker>
                                            )
                                        })
                                    }
                                    <AddMarker isAddingMarker={isAddingMarker} handleMarkerAdded={handleMarkerAdded} />
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <MapSidebar isHidden={isMapSidebarHidden} mapWidth={mapWidth} panTo={handlePanTo}></MapSidebar>
                                </MapContainer>

                                <Stack spacing={2} padding={"12px 0px"} direction="row" height="80px">
                                    <TextField fullWidth></TextField>
                                    <Button variant="outlined">send</Button>
                                </Stack>

                                <Stack spacing={1} justifyContent={"space-between"} direction="row" height="80px">
                                    <Button fullWidth variant="outlined">Raid Flare</Button>
                                    <Button fullWidth variant="outlined">Kecleon</Button>
                                    <Button fullWidth color={isAddingMarker ? 'success' : 'primary'} variant="outlined" onClick={() => { setIsAddingMarker(!isAddingMarker) }}>Add Pokestop</Button>
                                    <Button fullWidth variant="outlined">Fourth </Button>
                                </Stack>
                            </div>

                        </TabPanel>
                        <TabPanel value="2">
                            <ChatRoom roomId={"alta"}></ChatRoom>
                        </TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>

            </div>
        </>
    );
};

export default Pokedex;
