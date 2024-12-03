export type RawUser = {
    uid: string;
    username: string;
    email: string;
    name: string;
    lastname: string;
    dob?: string;
    password?: string;
    image?: Buffer | null;
    role: string;
};

export default RawUser;