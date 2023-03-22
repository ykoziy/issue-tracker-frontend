import { HttpParams } from '@angular/common/http';

export class HttpUtils {
  static buildHttpParams(obj: any): HttpParams {
    let params = new HttpParams();
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        obj[key] !== '' &&
        obj[key] !== undefined
      ) {
        params = params.set(key, obj[key]);
      }
    }
    return params;
  }
}
