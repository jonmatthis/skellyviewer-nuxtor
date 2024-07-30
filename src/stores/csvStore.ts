import {defineStore} from "pinia";

export const useCsvStore = defineStore("csvStore", () => {
    const csvData = ref("");
    const csvRoute = 'http://localhost:8000/csv'
    const csvError = ref("");
    const fetchData = async () => {
        try {

            console.log(`Fetching data from ${csvRoute}...`)
            const response = await fetch(csvRoute)
            console.log(`Response status: ${response.status}`)
            console.log(`Response JSON: ${JSON.stringify(response, null, 2)}`)
            if (!response.ok) {
                throw new Error(`Network response was not ok - Response status: ${response.status}`)
            }

            const result = await response.text()
            console.log(`Result: ${result}`)
            csvData.value = result as string
        } catch (error) {
            console.error('Error fetching data:', error)
            csvError.value = error as string
        }
    }

    onMounted(() => {
        fetchData()


        return {
            csvData
        };
    });
})
