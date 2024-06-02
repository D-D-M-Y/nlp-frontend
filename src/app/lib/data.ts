import { parse } from "path";
import { FileContent } from "./definitions";

export async function getFileData(searchFileTitle: string) {
    try {
        const response = await fetch("http://localhost:10168/openlexica/get_file_content/"+searchFileTitle);
        const content = await response.json();
        const parsedContent = content.res;
        return parsedContent;
    } catch(error){
        console.error("Error fetching data", error);
        throw new Error("Failed to fetch file content data "+error);
    }    
};

export async function getFileTitles(){
    try{
        const response = await fetch("http://localhost:10168/openlexica/get_file_titles");
        const titles = await response.json();
        const parsedTitles = titles.res
        console.log(parsedTitles)
        return parsedTitles;
    } catch(error){
        console.error("Error fetching titles", error);
        throw new Error("Failed to fetch titles:" + error);
    }
};

export async function generateFileContent(input: string){
    try{
        const response = await fetch("http://localhost:10168/openlexica/generate_files",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ context: input })});
        const outcome = await response.json();
        const parsedOutcome = outcome.res;
        console.log(parsedOutcome);
        return parsedOutcome;
    } catch (error){
        console.error("Error generating content", error);
        throw new Error("Failed to fetch generate content:" + error);
    }
}