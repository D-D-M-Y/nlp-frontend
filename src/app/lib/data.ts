import { parse } from "path";
import { FileContent } from "./definitions";

export async function getFileData() {
    try {
        const response = await fetch("http://localhost:10168/openlexica/get_file_content/1.%20Landscaping%20Techniques");
        const content = await response.json();
        const parsedContent = content.res;
        return parsedContent;
    } catch(error){
        console.error("Error fetching data", error);
        throw new Error("Failed to fetch file content data");
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