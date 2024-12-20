import { AVATAR_COLCORS } from "./color";
const hashCode = (fullName: string) => {
    let hash = 0;
    if (fullName.length === 0) {
        return hash;
    }
    for (let i = 0; i < fullName.length; i++) {
        hash += fullName.charCodeAt(i) * (i + 1);
    }
    return hash;
};

export const stringBgColor = (fullName?: string) => {
    if (!fullName) {
        return;
    }
    const getColorIndex = hashCode(fullName) % AVATAR_COLCORS.length;
    return AVATAR_COLCORS[getColorIndex];
};

export const stringAvatar = (fullName: string) => {
    if (!fullName) {
        return;
    }
    const [firstName, lastName] = fullName.split(" ");
    return {
        sx: {
            bgcolor: stringBgColor(fullName),
        },
        children: `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`,
    };
};
