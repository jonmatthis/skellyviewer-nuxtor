import {defineStore} from "pinia";
import { path } from '@tauri-apps/api';
import {BaseDirectory, exists, readTextFile} from "@tauri-apps/plugin-fs";
import Papa from 'papaparse';


export const useCsvStore = defineStore('csvStore', ()=> {
    const csvPath = ref('');
    const csvHeaders = ref<string[]>([]);
    const csvRows = ref<any[]>([]);

    const loadCsv = async (filePath: string) => {
        try {
            const csvContent = await readTextFile(filePath);
            Papa.parse(csvContent, {
                header: true,
                complete: (result) => {//ts-ignore
                    csvHeaders.value = result.meta.fields ?? [];
                    csvRows.value = result.data;
                    console.log('CSV headers:', csvHeaders.value);
                    console.log('CSV rows:', csvRows.value);
                },
                error: (parserError:any) => {
                    console.error(parserError.message);
                }
            });
        } catch (fetchError) {
            console.error(fetchError);
        }
    };
    onMounted(async () => {
        const homeDir = await path.homeDir();
        const freemocapTestDataCsvPath = '/freemocap_data/recording_sessions/freemocap_test_data/freemocap_test_data_by_trajectory.csv';
        if (await exists(freemocapTestDataCsvPath)) {console.log('File exists:', freemocapTestDataCsvPath);}
        const contents = await readTextFile(freemocapTestDataCsvPath, { baseDir: BaseDirectory.Home });
        console.log('File contents:', contents);
        csvPath.value = freemocapTestDataCsvPath;
        await loadCsv(csvPath.value);
    });

    return {
        csvPath,
        csvHeaders,
        csvRows,
        loadCsv
    }
})
