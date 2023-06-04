import pokedexjson from "./pokedex.json"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


//Map
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
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


import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';




import "./css/Pokedex.css"

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
        }
    }

}
const MapSidebar = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClose}>
                            <ListItemIcon>
                                <InboxIcon></InboxIcon>
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

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
    const [position, setPosition] = useState([69.96636432125193, 23.272927898342715]);
    const [zoomLevel, setZoomLevel] = useState(20);
    const [userPosition, setUserPosition] = useState({});
    const [markers, setMarkers] = useState([]);
    const [personalMarkers, setPersonalMarkers] = useState([]);
    const [isAddingMarker, setIsAddingMarker] = useState(false);
    const [isMapSidebarHidden, setIsMapSidebarHidden] = useState(true);

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
    useEffect(() => {
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
                                    <AddMarker isAddingMarker={isAddingMarker} handleMarkerAdded={handleMarkerAdded} />
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


                                    <MapSidebar isHidden={isMapSidebarHidden}></MapSidebar>
                                    {/* <Marker position={position} ref={markerRef} /> */}
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

                                {/* <hr style={{ margin: "24px 0" }}></hr>
                    <PokemonSelect handlePokemonChange={handlePokemonChange} ></PokemonSelect>
                    <PokemonInfo pokemon={pokemon}></PokemonInfo> */}
                            </div>

                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>

            </div>
        </>
    );
};

export default Pokedex;
