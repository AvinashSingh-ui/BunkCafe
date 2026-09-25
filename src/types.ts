export type Category="coffee"|"dessert"|"tea"|"snacks";
export interface MenuItem{
    id:number,
    name:string,
    price:number,
    description:string,
    image:string,
    popular:boolean,
    category:Category,
}