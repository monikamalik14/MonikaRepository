import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class StoryRestService {

    private storyListRestEndPoint = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';

    constructor(private httpClient: HttpClient) {
    }

    private getArgHeaders(): any {
        const httpsHeaders = {
            HttpHeaders: new HttpHeaders({
                "Access-Control-Allow-Origin": "https://hn.algolia.com/api/v1",
                "responseType": 'text'
            })
        }
        return httpsHeaders;
    }
}