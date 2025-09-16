
export class Car {
  constructor(
    public readonly id: number,
    public slug: string,
    public name: string,
    public brand: string,
    public year: number,
    public price: number,
    public isAvailable: boolean = true,
  ) {}
}
