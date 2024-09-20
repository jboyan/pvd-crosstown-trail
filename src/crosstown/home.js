import {Box, Button, Container, Grid2, Link, List, ListItem, Typography} from "@mui/material";
import logo from '../assets/img/logo.svg';

export default function Home() {
    return (
        <Container maxWidth="md" style={{textAlign: 'center', padding: '40px'}}>
            {/* Site Header Line */}
            {/*<header>*/}
            {/*    <Typography variant="h6" component="div" style={{marginBottom: '20px'}}>*/}
            {/*        The Providence Crosstown Trail*/}
            {/*    </Typography>*/}
            {/*</header>*/}

            {/* Bold Title */}
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                Providence Crosstown Trail
            </Typography>

            {/* Logo */}
            <Box display="flex" style={{marginBottom: '20px'}} justifyContent="center">
                <img src={logo} alt="Providence Crosstown Trail" style={{width: '250px', height: '250px'}}/>
            </Box>

            {/* Paragraphs */}
            <Typography variant="h5" fontStyle={"italic"} style={{marginBottom: '20px'}}>
                A big walk across a small city, from summit to shore, with neighborhood and park gems along
                the way!
            </Typography>

            <Button variant={"contained"} style={{marginBottom: '20px'}}
                    component="a" href="https://ppsri.org/events/walk-the-pvd-crosstown-trail-a-13-mile-urban-hike/">
                Join our Inaugural Public Hike on Saturday, Sep. 28!
            </Button>

            <Typography variant="body1" style={{textAlign: 'left', marginBottom: '20px'}}>
                Inspired by the San Francisco Crosstown Trail, this 13-mile walking route traverses the city of
                Providence, visiting both well-known landmarks and quiet neighborhoods. Follow the
                sidewalks of Silver Lake, Hartford, Olneyville, Manton, Mt. Pleasant, Smith Hill, downtown, the Jewelry
                District, South Providence, Elmwood, and Washington Park, as well as off-road paths through these
                parks:
                <Grid2 container spacing={2}>
                    <List style={{paddingLeft: 100}}>
                        {['Neutaconkanut Hill', 'Merino Park', 'Woonasquatucket River Greenway', 'Pleasant Valley Parkway',
                            'Gantry Gardens', 'Waterplace Park', 'Van Leesten Memorial Bridge', 'Roger Williams Park',
                            'Columbia Park', 'JWU Harborside Campus', 'Fields Point Wind Farm', 'Save the Bay Center'].map((park, index) => (
                            <Grid2 key={index} xs={12} sm={6}>
                                <ListItem
                                    style={{
                                        padding: '0px',
                                        listStyleType: 'disc',
                                        display: 'list-item'
                                    }}>{park}</ListItem>
                            </Grid2>
                        ))}
                    </List>
                </Grid2>
                This trail is newly established in summer 2024 and is a work in progress. We welcome your feedback!
            </Typography>

            <Typography variant="h4" align="left">Maps</Typography>

            <Box style={{margin: '40px 0'}}>
                <iframe title="Interactive Trail Map" src="/crosstown/map" width="100%" height={550}></iframe>
            </Box>

            <Button variant={"contained"} style={{marginBottom: '20px'}}
                    component="a" href="/crosstown/map">
                Interactive full-screen map
            </Button>
            <br/>
            <Button variant={"contained"} style={{marginBottom: '20px'}}
                    component="a" href="https://www.strava.com/routes/3201273282685028096">
                View on Strava
            </Button>
            <br/>
            <Button variant={"contained"} style={{marginBottom: '20px'}} disabled={true}
                    component="a" href="">
                View on AllTrails
            </Button>


            <Typography variant="h4" align="left">Credits</Typography>

            <Typography variant="body1" align={"left"}>
                • Trail design by Justin Boyan, with help from Sarah Zurier, Marisa Brown, Amy Greenwald, Geoff Meek,
                Magnus Thorsson, and others!
                <br/>
                • Thanks to the <Link href="https://ppsri.org/">Providence Preservation Society</Link> for hosting a
                brainstorming workshop about the trail at
                their April <i>Hacking Heritage</i> event.
                <br/>
                • The trail was inspired by the <Link href={"https://crosstowntrail.org/"}>San Francisco Crosstown
                Trail</Link>,
                created by Bob Siegel.
            </Typography>
        </Container>
    );

}
