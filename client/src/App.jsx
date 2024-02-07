import Auth from "./pages/auth";
function App() {
  return (
    <>
      <div className="container">
        <section className="image"></section>
        <section className="header">Sign in</section>
        <form action="" method="post">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <button type="submit"></button>
        </form>
      </div>
    </>
  );
}

export default App;
