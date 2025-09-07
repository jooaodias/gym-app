export class LateCheckInValidationError extends Error {
    constructor() {
        super('Late check-in validation. You can only validate check-ins up to 20 minutes after their creation.')
    }
}