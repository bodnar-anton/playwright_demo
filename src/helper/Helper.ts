import * as crypto from 'crypto';

class Helper {
    public static GetRandomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    public static GenerateRandomString(length = 4): string {
        return crypto.randomBytes(length).toString('hex');
    }

    public static GenerateRandomText(length = 6): string {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static GenerateRandomSpecialCharacters(length = 6): string {
        let result = '';
        let characters = '!\\"@#§$%&^/|[]<>.,\'`;:()*-+=?{}';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static RemoveSpecialCharacters(text: string): string {
        return text.replace(/[^a-zA-Z0-9]/g, '');
    }

    public static GenerateRandomEmail(): string {
        return `${Helper.GenerateRandomString()}@gmail.com`;
    }

    public static GenerateRandomValidPassword(): string {
        return `A${Helper.GenerateRandomString()}123`;
    }
}

export default Helper;
