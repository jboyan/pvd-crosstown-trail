export default function Home() {
    return (
        <div>
            <header>
                <h1>Providence Crosstown Trail</h1>
            </header>
            <main>
                <p>Foo bar baz quux</p>
                <iframe title="Interactive Trail Map" src="/crosstown/map" width={1100} height={550}></iframe>
            </main>
        </div>
    );
}
