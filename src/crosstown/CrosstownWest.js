import {Box, Button, Container, Link, List, ListItem, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import logo from '../assets/img/logo.svg'
import pxtWest from '../assets/img/pxt-west.png';

export default function CrosstownWest() {
    return (
        <Container maxWidth="md" style={{textAlign: 'center', padding: '40px'}}>
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                Providence Crosstown Trail—West End Edition
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


            <Button
                variant="contained"
                style={{marginBottom: '20px'}}
                target="_blank"
                component="a"
                href="https://ppsri.org/events/walk-the-pvd-crosstown-trail-a-13-mile-urban-hike/"
            >
                Walk this route with the PPS on Saturday, September 27
            </Button>


            <Typography variant="body1" style={{textAlign: 'left', marginBottom: '20px'}}>
                This "West End" variant of the <Link component={RouterLink} to="/crosstown">Providence Crosstown
                Trail</Link> heads
                east from Olneyville through Providence's West End, down to Roger Williams Park and
                the waterfront. This 12-mile route enables a stop at f/k/a Columbus Square on Elmwood Avenue, where
                a <Link
                href="https://pvdcl.org/" target="_blank">
                Providence Commemoration Labs</Link> performance event is happening on our walk day.

                We'll follow the
                sidewalks of Silver Lake, Hartford, Olneyville, the West End, South Providence, Elmwood, and Washington
                Park, as well as off-road paths through these
                parks:
                <List style={{paddingLeft: 100}}>
                    {['Neutaconkanut Hill', 'Merino Park', 'Woonasquatucket River Greenway', 'Donigian Park',
                        'Dexter Training Grounds', 'Bucklin Park', 'Locust Grove Cemetery',
                        'Roger Williams Park', 'Columbia Park', 'JWU Harborside Campus', 'Fields Point Wind Farm',
                        'Save the Bay Center'].map((park, index) => (
                        <ListItem
                            style={{
                                padding: '0px',
                                listStyleType: 'disc',
                                display: 'list-item'
                            }}>{park}
                        </ListItem>
                    ))}
                </List>
            </Typography>

            <Typography variant="h4" align="left" style={{marginBottom: '20px'}}>Maps</Typography>

            <Box style={{margin: '40px 0'}}>
                <img
                    src={pxtWest}
                    alt="Crosstown West Route Map"
                    style={{width: '100%', height: 'auto', maxWidth: '100%'}}
                />
            </Box>

            <Typography variant="body1" style={{textAlign: 'left', marginBottom: '20px'}}>
                We don't have an interactive web map available for this route yet, but
                if you have Strava, you can follow along using this link:
            </Typography>
            <Button
                variant="contained"
                style={{marginBottom: '20px'}}
                target="_blank"
                component="a"
                href="https://www.strava.com/routes/3405916210436730386"
            >
                West End Route on Strava
            </Button>
            <Typography variant="body1" style={{textAlign: 'left', marginBottom: '20px'}}>
                Like the original Crosstown Trail, the route starts at the <Link
                href="https://maps.app.goo.gl/WxWi5YJioNcs5WnX7" target="_blank">
                Igliozzi Rec Center (675 Plainfield Street)</Link> and
                ends at <Link
                href="https://maps.app.goo.gl/cXzzhT19kefw8iSm6" target="_blank">
                Fields Point (100 Save the Bay Drive)</Link>.

                The full walk is 12 miles long. For a shorter walk, you can start or end at our lunch spot, which will
                be approximately at noon at <Link
                href="https://maps.app.goo.gl/1qEG6DNheHdjWyqW6" target="_blank">
                Urban Greens Co-op Market (93 Cranston Street)</Link>.
            </Typography>

        </Container>
    );

}
