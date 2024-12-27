

export const getFullname = (userData) => {
    let firstName =
        userData?.firstname?.charAt(0).toUpperCase() +
        userData?.firstname?.slice(1).toLowerCase();
    let lastName =
        userData?.lastname?.charAt(0).toUpperCase() +
        userData?.lastname?.slice(1).toLowerCase();
    return firstName + " " + lastName;
};

export const getAvatarName = (userData) => {
    // console.log(userData)
    let f = userData?.firstname?.charAt(0).toUpperCase();
    let l = userData?.lastname?.charAt(0).toUpperCase();
    return f + l;
};