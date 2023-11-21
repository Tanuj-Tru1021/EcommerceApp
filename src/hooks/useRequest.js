import {useState, useEffect} from 'react'
import axios from 'axios'

const useRequest = (url) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                setData(response.data)
            } catch (err) {
                console.error("Error fetching data from API", err)
            } 
        }
        fetchData()
    }, [url])

    return { data, loading }
}

export default useRequest