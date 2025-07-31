export type UserMock = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: 'user' | 'admin';
    favorites: string[];
};

export const usersMock: UserMock[] = [
    {
        id: 'user1',
        name: 'Nguyễn Văn A',
        email: 'a@example.com',
        password: '123456',
        avatar: '/public/images/avatar1.png',
        role: 'user',
        favorites: ['bugatti-chiron', 'toyota-camry'],
    },
    {
        id: 'admin1',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        avatar: '/public/images/avatar2.png',
        role: 'admin',
        favorites: [],
    },
]; 