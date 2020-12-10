export class DiscountSolution {
    constructor(public id?: number, public name?: String, public discountId?: number) {}

    equals(discountSolutionToCompare: DiscountSolution): boolean {
        return this.name === discountSolutionToCompare.name && this.discountId === discountSolutionToCompare.discountId;
    }

    isPersisted(): boolean {
        return this.id != null && this.id > 0;
    }
}
