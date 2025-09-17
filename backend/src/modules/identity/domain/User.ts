export class User {
constructor(
public id: string,
public email: string,
public passwordHash: string,
public firstName?: string,
public lastName?: string,
) {}
}