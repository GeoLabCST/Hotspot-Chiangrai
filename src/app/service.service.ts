import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public pro: any = '57';
  public pvCode = 'pv_code=57';
  public centroid = [19.847225, 99.865868];
  public gps: any;

  constructor(
    public http: HttpClient
  ) { }

  pushGps(gps: any) {
    this.gps = gps
  }

  getGps() {
    return this.gps;
  }

  getPvCode() {
    return this.pvCode;
  }

  getCentroid() {
    return this.centroid;
  }

  // tslint:disable-next-line: max-line-length
  public fireIcon = `data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY2NTM2OyIgZD0iTTU0LjIxMSwyNDkuN2MwLDAsMjAuMjI4LDI5LjcxNyw2Mi42MjQsNTQuODcxYzAsMC0zMC43MDUtMjU5LjUwMiwxNjkuMzU4LTMwNC41NzEgIGMtNTEuMjU3LDE4OC4xMjEsNjUuMiwyNDEuMTc0LDEwNy42NTEsMTQxLjc4NmM3MC44OTMsOTQuNjUxLDE3LjA2NiwxNzcuMjI5LDE3LjA2NiwxNzcuMjI5ICBjMjkuMDY5LDQuMTg4LDUzLjQ4Ny0yNy41Nyw1My40ODctMjcuNTdjMC4yMTgsMy45MTIsMC4zNCw3Ljg1MSwwLjM0LDExLjgxOEM0NjQuNzM4LDQxOC41NDUsMzcxLjI4Myw1MTIsMjU2LDUxMiAgUzQ3LjI2Miw0MTguNTQ1LDQ3LjI2MiwzMDMuMjYyQzQ3LjI2MiwyODQuNzQ0LDQ5LjY4NiwyNjYuNzk0LDU0LjIxMSwyNDkuN3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNDIxRDsiIGQ9Ik00NjQuMzk4LDI5MS40NDVjMCwwLTI0LjQxOCwzMS43NTgtNTMuNDg3LDI3LjU3YzAsMCw1My44MjctODIuNTc4LTE3LjA2Ni0xNzcuMjI5ICBDMzUxLjM5NCwyNDEuMTc0LDIzNC45MzcsMTg4LjEyMSwyODYuMTk0LDBDMjc1LjQ3OSwyLjQxNCwyNjUuNDMxLDUuNDQ3LDI1Niw5LjAxOFY1MTJjMTE1LjI4MywwLDIwOC43MzgtOTMuNDU1LDIwOC43MzgtMjA4LjczOCAgQzQ2NC43MzgsMjk5LjI5NSw0NjQuNjE2LDI5NS4zNTcsNDY0LjM5OCwyOTEuNDQ1eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkJCRjAwOyIgZD0iTTE2NC40NTYsNDIwLjQ1NkMxNjQuNDU2LDQ3MS4wMTQsMjA1LjQ0Miw1MTIsMjU2LDUxMnM5MS41NDQtNDAuOTg2LDkxLjU0NC05MS41NDQgIGMwLTI3LjA2MS0xMS43NDEtNTEuMzc5LTMwLjQwOC02OC4xMzhjLTM1LjM5NCw0OC4wODUtODUuODMyLTI0Ljg1Ni00Ni41MjQtNzguMTIyICBDMjcwLjYxMiwyNzQuMTk2LDE2NC40NTYsMjg3LjQ5OSwxNjQuNDU2LDQyMC40NTZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkE5MDA7IiBkPSJNMzQ3LjU0NCw0MjAuNDU2YzAtMjcuMDYxLTExLjc0MS01MS4zNzktMzAuNDA4LTY4LjEzOGMtMzUuMzk0LDQ4LjA4NS04NS44MzItMjQuODU2LTQ2LjUyNC03OC4xMjIgIGMwLDAtNS43NjgsMC43MjUtMTQuNjEyLDMuNTE2VjUxMkMzMDYuNTU4LDUxMiwzNDcuNTQ0LDQ3MS4wMTQsMzQ3LjU0NCw0MjAuNDU2eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K`;

  getAmpHP7d() {
    return new Promise((res, rej) => {
      const url = `https://cors-anywhere.herokuapp.com/http://119.59.125.191:3000/hp/hpamp7d/${this.pro}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }

  getAmpHP() {
    return new Promise((res, rej) => {
      const url = `https://cors-anywhere.herokuapp.com/http://119.59.125.191:3000/hp/hpamp/${this.pro}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }

  getAmpName() {
    return new Promise((res, rej) => {
      const url = `https://cors-anywhere.herokuapp.com/http://119.59.125.191:3000/hp/getamp/${this.pro}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }


  getTamHP(ampcode: any) {
    return new Promise((res, rej) => {
      const url = `https://cors-anywhere.herokuapp.com/http://119.59.125.191:3000/hp/hptam/${ampcode}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }

  getTamName(ampcode: any) {
    return new Promise((res, rej) => {
      const url = `https://cors-anywhere.herokuapp.com/http://119.59.125.191:3000/hp/gettam/${ampcode}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }


}
