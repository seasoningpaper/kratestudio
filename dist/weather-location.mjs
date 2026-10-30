export const WEATHER_REFRESH_MS=300000;
export function validWeatherPoint(p){return !!p&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&p.lat>=-90&&p.lat<=90&&p.lon>=-180&&p.lon<=180}
export function weatherCounty(name=''){return String(name).replaceAll('台','臺')}
function insideRing(x,y,ring){let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside}return inside}
export function weatherPlace(rows,point){if(!validWeatherPoint(point)||!Array.isArray(rows))return null;for(const[county,town,b,polygons]of rows){if(point.lon<b[0]||point.lon>b[2]||point.lat<b[1]||point.lat>b[3])continue;for(const rings of polygons)if(insideRing(point.lon,point.lat,rings[0])&&!rings.slice(1).some(r=>insideRing(point.lon,point.lat,r)))return{county:weatherCounty(county),town}}return null}
export function ipWeatherPoint(raw){if(raw?.error||(raw?.country_code||raw?.country)!=='TW')return null;const p={lat:Number(raw.latitude),lon:Number(raw.longitude)};return raw.latitude!==null&&raw.longitude!==null&&validWeatherPoint(p)?p:null}
export function weatherTheme(choice,dark){return choice==='dark'||choice==='system'&&dark?'dark':'light'}
