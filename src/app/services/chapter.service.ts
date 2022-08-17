import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  public setChapter(chapter: any) {
    this._chapter = chapter;
}

public get chapter(): any {
    return this._chapter;
}

private _chapter: any = null; //or empty array if projects is an array
}
