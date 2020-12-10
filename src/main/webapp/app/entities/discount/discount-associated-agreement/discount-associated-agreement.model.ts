export class AssociatedAgreement {
    constructor(public id?: number, public agreementType?: AssociatedAgreementType, public version?: String, public discountId?: number) {}

    equals(associatedAgremeentToCompare: AssociatedAgreement): boolean {
        return this.agreementType === associatedAgremeentToCompare.agreementType && this.version === associatedAgremeentToCompare.version;
    }

    isPersisted(): boolean {
        return this.id != null && this.id > 0;
    }
}

export enum AssociatedAgreementType {
    EMO = 'EMO',
    Offer_Code = 'Offer Code',
    Addendum = 'Addendum'
}
