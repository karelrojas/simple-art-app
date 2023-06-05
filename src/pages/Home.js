export default function Home({setToken}) {
    const handleLogOut = () => {
        setToken(false);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <h3>This is the default landing page.</h3>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    );
};