export default function Layout(props) {
    const {children} = props


    return(
        <>
            <header>
                <h1 className="text-gradient">Copacetic</h1>
            </header>
            <main>
            {children}
            </main>

           <footer>
            <small>Created by</small>
            
            <a href="https://github.com/Mehta0007" target="_blank">
            <img src="https://avatars.githubusercontent.com/u/145217011?v=4" alt="pfp" />
            <p>@Mehta0007</p>
          <i class="fa-brands fa-github"></i>
            </a>

           </footer>
        
        </>
    )

}