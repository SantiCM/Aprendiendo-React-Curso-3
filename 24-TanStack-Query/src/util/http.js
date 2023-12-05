export async function fetchEvents({signal, searchTerm}) {

  let url = 'http://localhost:3000/events'

  if(searchTerm) {
    
    url += "?search=" + searchTerm
  
  }

  const response = await fetch(url, {signal: signal});

  if (!response.ok) {

    const error = new Error('An error occurred while fetching the events');

    error.code = response.status;

    error.info = await response.json();

    throw error;

  }

  const { events } = await response.json();

  return events;

}

/*

    const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    }

    fetchEvents()
      .then((events) => {
        setData(events);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


*/