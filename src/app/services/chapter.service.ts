import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  public cleanChapter(){
    // console.log("Cleaning chapter from Service")

    this._chapter = null;
  }

  public setChapter(chapter: any) {
    // console.log("Setting chapter from Service: " + chapter['text'])
    this._chapter = chapter;
}

public get chapter(): any {
  // console.log("Returning chapter from Service: " + this._chapter['text'])
    return this._chapter;
}

private _chapter: any = null; //or empty array if projects is an array
}
