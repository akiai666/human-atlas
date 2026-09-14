import names from './names-zh.json';

const translations:Record<string,string> = names;
export function chineseName(name:string):string {
 return translations[name.toLowerCase()] ?? name;
}
export function matchesName(item:{id:string;name:string},query:string):boolean {
 const term=query.trim().toLowerCase();
 return chineseName(item.name).includes(term)||item.name.toLowerCase().includes(term)||item.id.toLowerCase().includes(term);
}
