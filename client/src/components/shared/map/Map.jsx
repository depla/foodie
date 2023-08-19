function Map({ location, latitude, longitude }) {

    // useEffect(() => {
    //     fetchMapData();
    // }, []);

    // const [mapData, setMapData] = useState();
    // const fetchMapData = async () => {
    //     axios.get(`https://api.geocodify.com/v2/geocode?api_key=ca7af984e1dc67755ed4391108a726e0e793d6a4&q=900 Boston Post Road, Guilford Center, CT, USA`)
    //         .then((response) => {
    //             setMapData(response.data);
    //         });
    // }
    // const coordinates = mapData?.response.features[0].geometry.coordinates;
    // console.log(coordinates)

    return (
        <div>
            <iframe
                width="100%"
                height="300px"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                // src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${latitude},${longitude}`}>
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=${location}`}>
            </iframe>
        </div>
    )
}

export default Map