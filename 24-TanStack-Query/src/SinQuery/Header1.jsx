import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {

    // Un valor que nos permite averiguar si react query esta haciendo fecth en cualquier lugar de la app
    const fetching = useIsFetching()
  
    return (
    
      <>
      
        <div id="main-header-loading"></div>

        {fetching > 0 && <progress></progress>}
      
        <header id="main-header">
      
          <div id="header-title">
      
            <h1>React Events</h1>
      
          </div>
      
          <nav>{children}</nav>
      
        </header>
      
      </>
    
    );
  
  }