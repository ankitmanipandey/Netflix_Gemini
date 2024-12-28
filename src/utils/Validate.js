export const checkValidData = (email, password, name) => {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*+-]).{8,20}$/.test(password);
    const isValidName = name === null || /^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/.test(name);

    if (!isValidName) return "Name must contain only letters, spaces, hyphens & can't start with numbers."
    if (!isValidEmail) return "Email is not valid!!";
    if (!isValidPassword) return "Your Password may be like eg..@Netlfix123";
    return null;

}