import {Box, Button, Container, Link, List, ListItem, Typography} from "@mui/material";
import logo from '../assets/img/logo.svg'

export default function Home() {
    return (
        <Container maxWidth="md" style={{textAlign: 'center', padding: '40px'}}>
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

            <Button variant={"contained"} style={{marginBottom: '20px'}} target="_blank"
                    component="a" href="https://ppsri.org/events/walk-the-pvd-crosstown-trail-a-13-mile-urban-hike/">
                Join our Inaugural Public Hike on Saturday, Sep. 28
            </Button>

            <Typography variant="body1" style={{textAlign: 'left', marginBottom: '20px'}}>
                Inspired by the San Francisco Crosstown Trail, this 13-mile walking route traverses the city of
                Providence, visiting both well-known landmarks and quiet neighborhoods. Follow the
                sidewalks of Silver Lake, Hartford, Olneyville, Manton, Mt. Pleasant, Smith Hill, downtown, the Jewelry
                District, South Providence, Elmwood, and Washington Park, as well as off-road paths through these
                parks:
                <List style={{paddingLeft: 100}}>
                    {['Neutaconkanut Hill', 'Merino Park', 'Woonasquatucket River Greenway', 'Pleasant Valley Parkway',
                        'Gantry Gardens', 'Waterplace Park', 'Van Leesten Memorial Bridge',
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
                This route was newly established in 2024 and is a work in progress. We welcome your feedback!
            </Typography>

            <Typography variant="h4" align="left" style={{marginBottom: '20px'}}>Maps</Typography>

            <Typography variant="body1" style={{textAlign: 'left', marginBottom: '20px'}}>
                Follow the path using the map below. The full 13.4-mile route starts at the <Link
                href="https://maps.app.goo.gl/WxWi5YJioNcs5WnX7" target="_blank">
                Igliozzi Rec Center (675 Plainfield Street)</Link> and
                ends at <Link
                href="https://maps.app.goo.gl/cXzzhT19kefw8iSm6" target="_blank">
                Fields Point (100 Save the Bay Drive)</Link>.
                To shorten the walk, you can start or end downtown at the <Link
                href="https://maps.app.goo.gl/Ev7komHb5Lsb2Pa78" target="_blank">
                Van Leesten Memorial Bridge (334 South Water
                Street)</Link>.
            </Typography>

            <Box style={{margin: '40px 0'}}>
                <iframe title="Interactive Trail Map" src="/crosstown/map" width="100%" height={500}></iframe>
            </Box>

            <Button variant={"contained"} style={{marginBottom: '20px'}} target="_blank"
                    component="a" href="/crosstown/map">
                Interactive full-screen map
            </Button>
            <br/>
            <Button variant={"contained"} style={{marginBottom: '20px'}} target="_blank"
                    component="a" href="https://www.strava.com/routes/3201273282685028096">
                View on Strava
            </Button>
            <br/>
            <Button variant={"contained"} style={{marginBottom: '20px'}} target="_blank"
                    component="a" href="https://www.alltrails.com/explore/map/providence-crosstown-trail-4a11654">
                View on AllTrails
            </Button>

            <Typography variant="h4" style={{textAlign: 'left', marginBottom: '20px'}}>Credits</Typography>

            <Typography variant="body1" style={{textAlign: 'left', marginLeft: '20px', marginBottom: '20px'}}>
                • Trail design by Justin Boyan, with help from Sarah Zurier, Amy Greenwald, Geoff Meek,
                Magnus Thorsson, Traci Picard, Jonathan Bell, and others!
                <br/>
                • Thanks to Marisa Brown and the <Link href="https://ppsri.org/">Providence Preservation
                Society</Link> for hosting a
                brainstorming workshop about the trail at
                their April <i>Hacking Heritage</i> event.
                <br/>
                • The trail was inspired by the <Link href={"https://crosstowntrail.org/"}>San Francisco Crosstown
                Trail</Link>, created by Bob Siegel. We have also drawn inspiration from Boston's <Link
                href={"https://www.bostontrails.org/"}>Walking City Trail</Link> and <Link
                href={"https://www.parkspirit.org/the-eastwest-trail"}>Worcester's East-West Trail</Link>.
            </Typography>
        </Container>
    );

}
